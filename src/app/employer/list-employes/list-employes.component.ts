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

@Component({
  selector: 'app-list-employes',
  templateUrl: './list-employes.component.html',
  styleUrl: './list-employes.component.scss'
})


export class ListEmployesComponent implements OnInit {

  listeSociete: any[];
  employesState$: Observable<{ appState: string, appData?:  Page<UserDto>, error?: HttpErrorResponse }>;

  // @ts-ignore
    responseSubject = new BehaviorSubject<Page<UserDto>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private employeService: EmployeService, private societeService: SocieteService, private router: Router, private route: ActivatedRoute) {}



  ngOnInit(): void {
    this.societeService.findAll().subscribe(societes => {
      this.listeSociete = societes;
      console.log(this.listeSociete);
    });

    this.employesState$ = this.employeService.users$().pipe(
      map((response: Page<UserDto>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.number);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response });
      }),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) =>{
        return of({ appState: 'APP_ERROR', error })}
      )
    )
  }

  getSocieteNameById(societeId: number | undefined): string {
    const societe = this.listeSociete.find(s => s.id === societeId);
    return societe ? societe.nom : 'Unknown'; // Replace 'name' with your actual property name for societe name
  }
    gotToPage(query?: string, pageNumber: number = 0): void {
        this.employesState$ = this.employeService.users$(query, pageNumber).pipe(
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


    goToNextOrPreviousPage(direction?: string, query?: string): void {
        this.gotToPage(query, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
    }

  resetForm(form: NgForm) {
    form.resetForm({query: ''});
  }

}
