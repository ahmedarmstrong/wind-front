import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SocieteHolidaysDto} from "../interface/societeHolidaysDto";
import {CalendrierDto} from "../interface/calendrierDto";
import {UserCalendrierDto} from "../interface/userCalendrierDto";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";



@Injectable({ providedIn: 'root' })
export class CalendrierService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/calendrier/';

  findAll() {

    return   this.http.get<CalendrierDto[]>
    (this.serverUrl + 'all')
  };

  findCalendrierByUserId(userId: number){
    return this.http.get<CalendrierDto[]>(`${this.serverUrl}weekend/${userId}`).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
  updateUserCalendrier(userId: number, calendrierIds: number[]) {
    // Note: the URL path should be correct and the body must include both userId and calendrierIds as per your backend expectation
    return this.http.put<UserCalendrierDto>(`${this.serverUrl}update`, {
      userId: userId,
      calendrierIds: calendrierIds
    }).pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }
}
