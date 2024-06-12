import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {Responce} from "../interface/responce";




@Injectable({ providedIn: 'root' })
export class FicheDePaieService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/fiche/';

  generateFichePaie(month: string, year: string) {
    const url = `${this.serverUrl}generate/document`;
    let params = new HttpParams()
      .set('month', month)
      .set('year', year);

    return this.http.post<Responce<void>>(url, null, { params: params }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }



}
