import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../interface/page';
import {Methode} from "../interface/methode";
import {MethodeDto} from "../interface/methodeDto";


@Injectable({ providedIn: 'root' })
export class MethodeService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/fiche-paie/api/methode/';

  methodes$ = (query: string = '', page: number = 0, size: number = 6)
    : Observable< Page<Methode>> =>
    this.http.get<Page<Methode>>
    (`${this.serverUrl}all?query=${query}&page=${page}&size=${size}`);

  saveMethode(model:any) {
    return this.http.post<MethodeDto>(this.serverUrl + 'create', model);
  }
}
