import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SocieteHolidaysDto} from "../interface/societeHolidaysDto";
import {CalendrierDto} from "../interface/calendrierDto";



@Injectable({ providedIn: 'root' })
export class CalendrierService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/calendrier/';

  findAll() {

    return   this.http.get<CalendrierDto[]>
    (this.serverUrl + 'all')
  };

  findCalendrierByUserId(userId: number){
    return this.http.get<CalendrierDto[]>(`${this.serverUrl}weekend/${userId}`)
  }

}
