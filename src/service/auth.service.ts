import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, of, tap, throwError} from "rxjs";

import {Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {User} from "../interface/user";
import {UserDto} from "../interface/userDto";
import {JwtHelperService} from "@auth0/angular-jwt";


export interface AuthResponseData {
  id : number,
  societeId: number;
  email : string,
  roles : string[],
  accessToken : string ;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthenticatedUser$  = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) { }
  userProfile = new BehaviorSubject<UserDto | null>(null);
  jwtService: JwtHelperService = new JwtHelperService();

  login(email : string, password: string) {
    return this.http.request<AuthResponseData>('post','http://localhost:9191/user-service/api/v1/auth/authenticate',
      {
        body : {email, password},
        withCredentials : true
      }).pipe(
      catchError(err => {
        console.log(err);
        return throwError(() =>  new Error(err.error.message))
      }),
      tap(
        user => {

          const extractedUser : User = {
            accessToken: user.accessToken,
            email: user.email,
            id: user.id,
            societeId:user.societeId,
            role : {
              name : user.roles.find(role => role.includes('ROLE')) || '',
              permissions : user.roles.filter(permission => !permission.includes('ROLE'))
            }
          }
          this.storageService.saveUser(extractedUser);
          this.AuthenticatedUser$.next(extractedUser);
        }
      )
    );
  }

  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData);
  }

  logout(){
    this.http.request('post','http://localhost:9191/user-service/api/v1/auth/logout',{
      withCredentials: true
    }).subscribe({
      next: () => {
        this.storageService.clean();
        this.AuthenticatedUser$.next(null);
        this.router.navigate(['/login']);
      }
    })

  }

  refreshToken(){
    return this.http.request('post', 'http://localhost:9191/user-service/api/v1/auth/refresh-token-cookie', {
      withCredentials: true
    })
  }
}
