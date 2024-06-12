import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Page} from "../../interface/page";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {catchError, map, startWith} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {Pointage} from "../../interface/pointage";
import {PointageService} from "../../service/pointage.service";
import {FicheDePaieService} from "../../service/ficheDePaie.service";
import {FileService} from "../../service/file.service";
import {UploadResponseDto} from "../../interface/UploadResponseDto";
import {DuplicateRecordDto} from "../../interface/DuplicateRecordDto";
import {ConfirmDialogService} from "../composants/confirm-dialog/confirm-dialog.service";
import {AlertService} from "../composants/alert/alert.service";
import {PointageDto} from "../../interface/pointageDto";
import {Responce} from "../../interface/responce";
import {SpinnerService} from "../composants/spinner/spinner.service";
interface Employee{
  id?: number;
  nom?: string;
  prenom?: string;
}
@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.scss'
})
export class PointageComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef;
  isLoading: boolean = false;
  selectedFile: File | null = null;
  uploadResponse: UploadResponseDto | null = null;
  isError: boolean = false;
  size: number = 10;
  month: string = '';
  year: string = '';
  message: string;
  errorMessage: string;
  messageType: 'success' | 'error' = 'error';

  poinatgeStates$: Observable<{ appState: string, appData?:  Page<Pointage>, error?: HttpErrorResponse }>;

  // @ts-ignore
  responseSubject = new BehaviorSubject<Page<Pointage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private pointageService: PointageService,
              private fiche: FicheDePaieService,
              private spinnerService: SpinnerService,
              private confirmDialogService: ConfirmDialogService,
              private alertService: AlertService,
              private fileService: FileService,) {}



  ngOnInit(): void {
    this.loadPointages("", "")
  }

  public loadPointages(query: string, date: string, page = 0): void {
    if (!query && !date) {
      // Optionally handle empty search case
      return;
    }
    this.poinatgeStates$ = this.pointageService.pointages$(query, date, page, this.size).pipe(
      map((response: Page<Pointage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.number);
        return { appState: 'APP_LOADED', appData: response };
      }),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to load users:', error);
        return of({ appState: 'APP_ERROR', error: error });
      })
    );
  }

  gotToPage(query?: string, date?: string,  pageNumber: number = 0): void {
    this.poinatgeStates$ = this.pointageService.pointages$(query!, date!, pageNumber, this.size).pipe(
      map((response: Page<Pointage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response });
      }),
      startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
      catchError((error: HttpErrorResponse) =>{
        return of({ appState: 'APP_ERROR', error })}
      )
    )
  }

  goToNextOrPreviousPage(direction?: string,query?: string, date?: string): void {
    this.gotToPage(query, date, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }
  getVisiblePages(currentPage: number | null, totalPages: number): number[] {
    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 0;
      endPage = totalPages - 1;
    } else {
      // more than 5 total pages so calculate start and end pages
      if (currentPage! <= 2) {
        startPage = 0;
        endPage = 4;
      } else if (currentPage! + 2 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage! - 2;
        endPage = currentPage! + 2;
      }
    }
    return Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  }


  generateFichePaie() {
    this.spinnerService.show(); // Show spinner
    this.fiche.generateFichePaie(this.month, this.year).subscribe(
      response => {
        this.spinnerService.hide(); // Hide spinner
        if (response.success) {
          this.alertService.open(response.message);
          if (response.message && response.message.includes('with some errors')) {
            this.alertService.open('with some errors: ' + response.message);
          }
        } else {
          this.alertService.open(response.message);
        }
      },
      error => {
        this.spinnerService.hide(); // Hide spinner
        this.alertService.open(error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.onUpload()
  }

  async onUpload() {
    this.spinnerService.show();
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        async (response: UploadResponseDto) => {
          this.uploadResponse = response;
          if (response.duplicateRecords && response.duplicateRecords.length > 0) {
            const confirmed = await this.confirmDialogService.open(`There are ${response.duplicateRecords.length} duplicates. Do you want to replace them?`);
            if (confirmed) {
              this.spinnerService.hide();
              this.replaceDuplicates(response.duplicateRecords);
            } else {
              this.spinnerService.hide();
              await this.alertService.open('You chose not to replace the duplicates.');
            }
          } else {
            await this.alertService.open(response.message);
            this.spinnerService.hide();
          }
        },
        error => {
          this.spinnerService.hide();
          console.error('Upload error', error);
        }
      );
    } else {
      this.spinnerService.hide();
    }
  }

  replaceDuplicates(duplicateRecords: DuplicateRecordDto[]): void {
    this.spinnerService.show();
    const pointages: PointageDto[] = duplicateRecords.map(record => ({
      idSociete: record.idSociete,
      matricule: record.matricule,
      date: record.date,
      heureDebut: record.heureDebut,
      heureFin: record.heureFin,
      userId: record.userId
    }));

    this.fileService.replaceDuplicates(pointages).subscribe(
      (response: UploadResponseDto) => {
        this.spinnerService.hide();
         this.alertService.open(response.message);
      },
      error => {
        this.spinnerService.hide();
        console.error('Replace error', error);
      }
    );
  }
  setSuccessMessage(message: string) {
    this.errorMessage = message;
    this.messageType = 'success';
    this.clearMessage();
  }
  setErrorMessage(message: string) {
    this.errorMessage = message;
    this.messageType = 'error';
    this.clearMessage();
  }
  clearMessage() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000); // Auto-clear the message after 5 seconds
  }
}
