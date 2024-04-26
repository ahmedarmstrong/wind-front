import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../interface/page';
import {Pointage} from "../interface/pointage";


@Injectable({ providedIn: 'root' })
export class PointageService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/pointage/';

  pointages$ = (query: string = '', page: number = 0, size: number = 6)
    : Observable< Page<Pointage>> =>
    this.http.get<Page<Pointage>>
    (`${this.serverUrl}all?query=${query}&page=${page}&size=${size}`);


}
