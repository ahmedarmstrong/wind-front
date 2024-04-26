import { Component } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Page} from "../../interface/page";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, map, startWith} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {Pointage} from "../../interface/pointage";
import {PointageService} from "../../service/pointage.service";

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.scss'
})
export class PointageComponent {

  poinatgeStates$: Observable<{ appState: string, appData?:  Page<Pointage>, error?: HttpErrorResponse }>;

  // @ts-ignore
  responseSubject = new BehaviorSubject<Page<Pointage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private pointageService: PointageService) {}



  ngOnInit(): void {
    this.poinatgeStates$ = this.pointageService.pointages$().pipe(
      map((response: Page<Pointage>) => {
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

  gotToPage(query?: string, pageNumber: number = 0): void {
    this.poinatgeStates$ = this.pointageService.pointages$(query, pageNumber).pipe(
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


  goToNextOrPreviousPage(direction?: string, query?: string): void {
    this.gotToPage(query, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  resetForm(form: NgForm) {
    form.resetForm({query: ''});
  }

}
