import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegimeDto} from "../interface/regimeDto";
import {HolidayDto} from "../interface/holidayDto";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";



@Injectable({ providedIn: 'root' })
export class HolidaysService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/holidays/';

  findAll() {

    return   this.http.get<HolidayDto[]>
    (this.serverUrl + 'all').pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  findAllByPays(pays:String) {

    return   this.http.get<HolidayDto[]>
    (`${this.serverUrl}all/${pays}`).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  saveHoliday(model:any) {
    return this.http.post<HolidayDto>(this.serverUrl + 'create', model).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  delete(holidayId: number) {
    return this.http.delete(this.serverUrl + 'delete/' + holidayId)
      .pipe(
        catchError(err => {
          console.log(err);

          return throwError(() =>  new Error(err.error.message))
        }),
      );
  }
}
