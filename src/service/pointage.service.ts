import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Page } from '../interface/page';
import {Pointage} from "../interface/pointage";
import {UserDto} from "../interface/userDto";
import {catchError} from "rxjs/operators";


@Injectable({ providedIn: 'root' })
export class PointageService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/pointage/';


  pointages$ = (query: string, date: string, page: number = 0, size: number)
    : Observable< Page<Pointage>> =>
    this.http.get<Page<Pointage>>
    (`${this.serverUrl}all?query=${query}&date=${date}&page=${page}&size=${size}`).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
}
