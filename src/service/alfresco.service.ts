import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Page} from "../interface/page";
import {Pointage} from "../interface/pointage";
import {Fiche} from "../interface/fiche";
import {UserDto} from "../interface/userDto";

interface FicheNameDto {
  ficheName: string;
}


@Injectable({ providedIn: 'root' })
export class AlfrescoService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/alfrsco/api/';
  ficheUrl = 'http://localhost:9191/alfrsco/api/fiches/';


  searchNodes(term: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.serverUrl}searchNodes/societe?term=${term}`).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  getDocumentUrl(name: string, month?: string, year?: string){
    return this.http.get<string>(`${this.ficheUrl}search-document?name=${name}&month=${month}&year=${year}`, {responseType: 'text' as 'json'}).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  getDocumentUrlByName(name: string){
    return this.http.get<string>(`${this.ficheUrl}search-document-name?name=${name}`, {responseType: 'text' as 'json'}).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
  getAllDocument(){
    return this.http.get<string[]>(`${this.ficheUrl}names`).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

  searchFiches(ficheName: string, page: number, size: number) {
    let params = new HttpParams()
      .set('ficheName', ficheName)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Fiche>>(`${this.ficheUrl}/search`, { params });
  }

  all$ = (nom: string = '', mois: string = '', year: string = '', page: number = 0, size: number)
    : Observable< Page<Fiche>> =>
    this.http.get<Page<Fiche>>
    (`${this.ficheUrl}/search?nom=${nom}&mois=${mois}&year=${year}&page=${page}&size=${size}`);

  getFicheNamesForCurrentUser(userId: number) {
    const headers = new HttpHeaders().set('X-UserId', userId.toString());
    return this.http.get<FicheNameDto[]>(`${this.ficheUrl}/currentUser`, { headers });
  }
}
