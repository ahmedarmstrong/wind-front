import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SocieteDto} from "../interface/societeDto";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";



@Injectable({ providedIn: 'root' })
export class SocieteService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/societe/';

  findAll() {

    return   this.http.get<SocieteDto[]>
    (this.serverUrl + 'all').pipe(
      catchError(err => {
        console.log(err);

        return throwError(() =>  new Error(err.error.message))
      }),
    );
  }

}
