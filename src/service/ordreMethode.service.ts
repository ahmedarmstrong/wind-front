import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../interface/page';
import {OrdreMethode} from "../interface/ordreMethode";
import {OrdreMethodeDto} from "../interface/ordreMethodeDto";


@Injectable({ providedIn: 'root' })
export class OrdreMethodeService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/fiche-paie/api/ordreMethode/';

  ordres$ = (query: string = '', page: number = 0, size: number = 6)
    : Observable< Page<OrdreMethode>> =>
    this.http.get<Page<OrdreMethode>>
    (`${this.serverUrl}all?query=${query}&page=${page}&size=${size}`);

  saveOrdre(model:any) {
    return this.http.post<OrdreMethodeDto>(this.serverUrl + 'create', model);
  }
}
