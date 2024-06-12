import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlfrescoService} from "../../service/alfresco.service";
import {EmployeService} from "../../service/employe.service";
import {UserDto} from "../../interface/userDto";
import {Page} from "../../interface/page";
import {Fiche} from "../../interface/fiche";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, map, startWith} from "rxjs/operators";
import {NgForm} from "@angular/forms";

interface FileNameParts {
  nom?: string;
  mois?: string;
  annee?: string;
}
interface NameParts {
  nom: string;
  prenom: string;
}
@Component({
  selector: 'app-paie',
  templateUrl: './paie.component.html',
  styleUrl: './paie.component.scss'
})
export class Paie implements OnInit{
  users: UserDto[] = [];
  name: string;
  month: string;
  year: string;
  ficheUrls: string[] = [];
  documentUrl: string;
  documents: any[] = [];
  searchTerm: string = '';
  searchResults: string[] = [];
  errorMessage: string;
  messageType: 'success' | 'error' = 'error';
  ficheName: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  page: Page<Fiche> | undefined;
  months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' }
  ];

  size: number = 10;
  employesState$: Observable<{ appState: string, appData?:  Page<Fiche>, error?: HttpErrorResponse }>;

  // @ts-ignore
  responseSubject = new BehaviorSubject<Page<Fiche>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();


  constructor(
    private router: Router,
    private alfrescoService: AlfrescoService,
    private employerService: EmployeService,
  ) { }


  ngOnInit(): void {
    this.alfrescoService.getAllDocument().subscribe({
      next: (urls) => {
        this.ficheUrls = urls
      },
      error: (error) => console.error('Failed to fetch fiche URLs', error)
    });;
    this.loadUsers();
    this.alll()

  }
  showPreview(pdfUrl: string): void {
    const pdfPreview = document.getElementById('pdf-preview');
    const pdfIframe = document.getElementById('pdf-iframe') as HTMLIFrameElement;

    if (pdfPreview && pdfIframe) {
      pdfPreview.style.display = 'block';
      pdfIframe.src = pdfUrl;  // Set the iframe src to the PDF URL
    }
  }

  hidePreview(): void {
    const pdfPreview = document.getElementById('pdf-preview');
    const pdfIframe = document.getElementById('pdf-iframe') as HTMLIFrameElement;

    if (pdfPreview && pdfIframe) {
      pdfPreview.style.display = 'none';
      pdfIframe.src = '';  // Clear the iframe src
    }
  }
  public alll(nom = '', mois = '', year = '', page = 0): void {
    this.employesState$ = this.alfrescoService.all$(nom, mois, year, page, this.size).pipe(
      map((response: Page<Fiche>) => {
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

  gotToPage(nom?: string, mois?: string, year?: string,  pageNumber: number = 0): void {
    this.employesState$ = this.alfrescoService.all$(nom, mois, year, pageNumber, this.size).pipe(
      map((response: Page<Fiche>) => {
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


  goToNextOrPreviousPage(direction?: string, nom?: string, mois?: string, year?: string): void {
    this.gotToPage(nom, mois, year, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
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


  fetchDocument(documentName: string): void {
    this.alfrescoService.getDocumentUrlByName(documentName).subscribe({
      next: (url) => {
        window.open(url, '_blank');
      },
      error: (err) => {
        this.setErrorMessage('Failed to fetch document');
      }
    });
  }

  onSearch(): void {
    this.alfrescoService.searchFiches(this.ficheName, this.currentPage, this.pageSize)
      .subscribe(page => {
        this.page = page;
      }, error => {
        console.error('Error fetching data: ', error);
      });
  }

  loadUsers() {
    this.employerService.findAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  parseFileName(fileName: string): FileNameParts {
    const parts = fileName.split('-'); // Splitting by '-' as per your filename format
    const nom = parts[0];
    const mois = parts[1];
    const annee = parts[2].replace('.pdf', ''); // Removing the file extension

    return {nom, mois, annee };
  }

  splitName(fullName: string): NameParts {
    const index = fullName.search(/[A-Z][a-z]*$/);
    const nom = fullName.substring(0, index);
    const prenom = fullName.substring(index);

    return { nom, prenom };
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

  resetForm(form: NgForm) {
    form.resetForm({
      nom: '',
      mois: '',
      year: '',
    });
    this.alll();
  }
}
