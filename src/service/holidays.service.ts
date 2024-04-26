import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegimeDto} from "../interface/regimeDto";
import {HolidayDto} from "../interface/holidayDto";



@Injectable({ providedIn: 'root' })
export class HolidaysService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/holidays/';

  findAll() {

    return   this.http.get<HolidayDto[]>
    (this.serverUrl + 'all')
  };

  findAllByPays(pays:String) {

    return   this.http.get<HolidayDto[]>
    (`${this.serverUrl}all/${pays}`)
  };

  saveHoliday(model:any) {
    return this.http.post<HolidayDto>(this.serverUrl + 'create', model);
  }

  delete(holidayId: number) {
    return this.http.delete(this.serverUrl + 'delete/' + holidayId);
  }
}
