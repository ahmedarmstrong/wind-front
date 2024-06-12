import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import { Page } from '../interface/page';
import {UserDto} from "../interface/userDto";
import {catchError} from "rxjs/operators";
import {User} from "../interface/user";
import {UpdateUser} from "../interface/updateUser";
import {SocieteDto} from "../interface/societeDto";
import {UpdatePassword} from "../interface/updatePassword";


@Injectable({ providedIn: 'root' })
export class EmployeService {


  constructor(private http: HttpClient) { }

    serverUrl = 'http://localhost:9191/user-service/api/users/';
    server = 'http://localhost:9191/user-service/api/v1/auth/register'
      users$ = (nom: string = '', prenom: string = '', matricule: string = '', grade: string = '', page: number = 0, size: number)
          : Observable< Page<UserDto>> =>
          this.http.get<Page<UserDto>>
          (`${this.serverUrl}all/pages?nom=${nom}&prenom=${prenom}&matricule=${matricule}&grade=${grade}&page=${page}&size=${size}`);



    saveUser(model:any) {
        return this.http.post<UserDto>(this.server, model).pipe(
          catchError(err => {
            console.log(err);

            return throwError(() =>  new Error(err.error.message))
          }),
        );
    }

  findAll() {

    return   this.http.get<UserDto[]>
    (this.serverUrl + 'all').pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
  delete(userId: number) {
    return this.http.delete(this.serverUrl + 'delete/' + userId)
      .pipe(
        catchError(err => {
          console.log(err);

          return throwError(() =>  new Error(err.error.message))
        }),
      );
  }

  findUserById(userId: number){
    return this.http.get(this.serverUrl + userId).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  updateUser(model: any) {
    return this.http.put<UpdateUser>(`${this.serverUrl}update/user`, model).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
  updatePassword(model: any) {
      return this.http.post<UpdatePassword>(`${this.serverUrl}update/password`, model).pipe(
        catchError(err => {
          console.log(err);

          return throwError(() =>  new Error(err.error))
        }),
      );
  }

  resetPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.serverUrl}resetPassword`, null, { params }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  confirmPassword(token: string, password: string, confirmPassword: string) {
    const body = {
      token: token,
      password: password,
      confirmPassword: confirmPassword
    };
    return this.http.post(`${this.serverUrl}reset-password`, body).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.text))
      }),
    );
  }
}
