import { HttpErrorResponse } from '@angular/common/http';
import {Component, Input, NgModule, OnInit} from '@angular/core';
import {map, startWith, catchError, switchMap} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {Page} from "../../../interface/page";
import {EmployeService} from "../../../service/employe.service";
import {NgForm} from "@angular/forms";
import {UserDto} from "../../../interface/userDto";
import {SocieteService} from "../../../service/societe.service";
import {Pointage} from "../../../interface/pointage";
import {SocieteDto} from "../../../interface/societeDto";
import {ActivatedRoute, Router, RouterModule, Routes} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-list-employes',
  templateUrl: './list-employes.component.html',
  styleUrl: './list-employes.component.scss'
})


export class ListEmployesComponent implements OnInit {
  size: number = 10;
  employesState$: Observable<{ appState: string, appData?:  Page<UserDto>, error?: HttpErrorResponse }>;

  // @ts-ignore
    responseSubject = new BehaviorSubject<Page<UserDto>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private employeService: EmployeService,
              private router: Router,
              private location: Location) {}



  ngOnInit(): void {
this.loadUsers()
  }

  public loadUsers(nom = '', prenom = '', matricule = '', grade = '', page = 0): void {
    this.employesState$ = this.employeService.users$(nom, prenom, matricule, grade, page, this.size).pipe(
      map((response: Page<UserDto>) => {
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

    gotToPage(nom?: string, prenom?: string, matricule?: string, grade?: string,  pageNumber: number = 0): void {
        this.employesState$ = this.employeService.users$(nom, prenom, matricule, grade, pageNumber, this.size).pipe(
            map((response: Page<UserDto>) => {
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


    goToNextOrPreviousPage(direction?: string, nom?: string, prenom?: string, matricule?: string, grade?: string): void {
        this.gotToPage(nom, prenom, matricule, grade, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
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
  onFormChange(nom?: string, prenom?: string, matricule?: string, grade?: string) {
    setTimeout(() => {
      this.gotToPage(nom, prenom, matricule, grade);
    }, 500);

  }

  resetForm(form: NgForm) {
    console.log('Resetting form', form);
    form.resetForm({
      nom: '',
      prenom: '',
      matricule: '',
      grade: ''
    });
    this.loadUsers();
  }

  ajouterEmployer(): void {
    this.router.navigate(['main/employer/create']);
  }
  backButton(): void{
    this.location.back();
  }
  onRowClick(id: number) {
    this.router.navigate(['/main/employer/user-profile/', id]);
  }

}
