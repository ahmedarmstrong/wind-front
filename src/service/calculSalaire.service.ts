import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";




@Injectable({ providedIn: 'root' })
export class CalculSalaireService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/calcul';

  calculateNetSalary(salaireBrut: number, isHeadOfFamily: boolean, numberOfChildren: number): Observable<number> {
    return this.http.get<number>(`${this.serverUrl}/salaireNet`, {
      params: new HttpParams()
        .set('salaireBrut', salaireBrut.toString())
        .set('isHeadOfFamily', isHeadOfFamily.toString())
        .set('numberOfChildren', numberOfChildren.toString())
    }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
  calculateCnss(salaireBrut: number) {
    // Construct the query string
    const url = `${this.serverUrl}/cnss?salaireBrut=${salaireBrut}`;
    return this.http.get<number>(url).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
  calculateCss(salaireBrut: number, isHeadOfFamily: boolean , numberOfChildren: number): Observable<number> {
    return this.http.get<number>(`${this.serverUrl}/css`, {
      params: new HttpParams()
        .set('salaireBrut', salaireBrut.toString())
        .set('isHeadOfFamily', isHeadOfFamily.toString())
        .set('numberOfChildren', numberOfChildren.toString())
    }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  calculateSalaireImposable(salaireBrut: number, isHeadOfFamily: boolean, numberOfChildren: number): Observable<number> {
    return this.http.get<number>(`${this.serverUrl}/salaireImposable`, {
      params: new HttpParams()
        .set('salaireBrut', salaireBrut.toString())
        .set('isHeadOfFamily', isHeadOfFamily.toString())
        .set('numberOfChildren', numberOfChildren.toString())
    }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  calculateIrpp(salaireBrut: number, isHeadOfFamily: boolean, numberOfChildren: number): Observable<number> {
    return this.http.get<number>(`${this.serverUrl}/irpp`, {
      params: new HttpParams()
        .set('salaireBrut', salaireBrut.toString())
        .set('isHeadOfFamily', isHeadOfFamily.toString())
        .set('numberOfChildren', numberOfChildren.toString())
    }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  estimateSalaireBrut(salaireBrut: number, isHeadOfFamily: boolean, numberOfChildren: number): Observable<number> {
    return this.http.get<number>(`${this.serverUrl}/salaireBrut`, {
      params: new HttpParams()
        .set('salaireBrut', salaireBrut.toString())
        .set('isHeadOfFamily', isHeadOfFamily.toString())
        .set('numberOfChildren', numberOfChildren.toString())
    }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

}
