import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpHeaders, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LoaderService} from "../app/composants/loader/service/loader.service";
import {TokenModel} from "../interface/token";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";


@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    let authenticationResponse: TokenModel = {};
    if (localStorage.getItem('authenticated-user')) {
      authenticationResponse = JSON.parse(
        localStorage.getItem('authenticated-user') as string
      );
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + authenticationResponse.accessToken
        })
      });
      return this.handleRequest(authReq, next);
    }else if (localStorage.getItem('authenticated-user') == null){
      this.authService.refreshToken()
    }
    return this.handleRequest(req, next);
  }

  handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
      }, (err: any) => {
        this.loaderService.hide();
      }));
  }
}
