import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SocieteDto} from "../interface/societeDto";
import {Observable, throwError} from "rxjs";
import {SocieteHolidaysDto} from "../interface/societeHolidaysDto";
import {Page} from "../interface/page";
import {UserDto} from "../interface/userDto";
import {RegimeDto} from "../interface/regimeDto";
import {SocieteHolidaysRequest} from "../interface/societeHolidaysRequest";
import {Status} from "../interface/status";
import {catchError} from "rxjs/operators";



@Injectable({ providedIn: 'root' })
export class SocieteHolidaysService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/societeHolidays/';

  findAll() {

    return   this.http.get<SocieteHolidaysDto[]>
    (this.serverUrl + 'all')
      .pipe(
        catchError(err => {
          console.log(err);

          return throwError(() =>  new Error(err.error.message))
        }),
      );
  }


  holidays$ = (page: number = 0, size: number = 6): Observable<Page<SocieteHolidaysDto>> => {
    const societeId = this.getCurrentUserSocieteId();
    if (typeof societeId === 'undefined') {
      // Handle the scenario where societeId is not available. Perhaps return an empty observable or error observable.
      throw new Error('societeId is not available'); // Or handle this more gracefully
    }
    return this.http.get<Page<SocieteHolidaysDto>>(`${this.serverUrl}find?societeId=${societeId}&page=${page}&size=${size}`).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }




  findHolidaysBySocieteId(): Observable<any> {
    const societeId = this.getCurrentUserSocieteId();
    if (societeId === undefined) {
      // Handle the case where societeId is not available
      console.error('societeId is not available');
       // You might want to return an Observable here that indicates the error
    }

    return this.http.get(`${this.serverUrl}find/list?societeId=${societeId}`).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  private getCurrentUserSocieteId(): number | undefined {
    const currentUser = localStorage.getItem('authenticated-user');
    if (!currentUser) return undefined;

    const userData = JSON.parse(currentUser);
    return userData.societeId; // Adjust based on your actual data structure
  }

  saveSocieteHoliday(holidayId: number, status: Status): Observable<SocieteHolidaysRequest> {
    const societeId = this.getCurrentUserSocieteId();
    if (societeId === undefined) {
      throw new Error('No societe ID found for the current user');
    }

    const model: SocieteHolidaysRequest = {
      societeId: societeId,
      holidayId: holidayId,
      status: status
    };

    return this.http.post<SocieteHolidaysRequest>(this.serverUrl + 'create', model).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    ).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  delete(holidayId: number) {
    return this.http.delete(this.serverUrl + 'delete/' + holidayId).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    ).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
}
