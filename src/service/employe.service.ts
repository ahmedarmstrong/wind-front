import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import { Page } from '../interface/page';
import {UserDto} from "../interface/userDto";
import {catchError} from "rxjs/operators";
import {User} from "../interface/user";
import {UpdateUser} from "../interface/updateUser";


@Injectable({ providedIn: 'root' })
export class EmployeService {


  constructor(private http: HttpClient) { }

    serverUrl = 'http://localhost:9191/user-service/api/users/';
    server = 'http://localhost:9191/user-service/api/v1/auth/register'
      users$ = (query: string = '', page: number = 0, size: number = 3)
          : Observable< Page<UserDto>> =>
          this.http.get<Page<UserDto>>
          (`${this.serverUrl}all/pages?query=${query}&page=${page}&size=${size}`);



    saveUser(model:any) {
        return this.http.post<UserDto>(this.server, model).pipe(
          catchError(err => {
            console.log(err);

            return throwError(() =>  new Error(err.error.message))
          }),
        );
    }

  findUserById(userId: number){
    return this.http.get(this.serverUrl + userId)
  }

  updateUser(model: any) {
    return this.http.put<UpdateUser>(`${this.serverUrl}update/user`, model);
  }

}
