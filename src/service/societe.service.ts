import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SocieteDto} from "../interface/societeDto";
import {Observable} from "rxjs";



@Injectable({ providedIn: 'root' })
export class SocieteService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/societe/';

  findAll() {

    return   this.http.get<SocieteDto[]>
    (this.serverUrl + 'all')
  };

  saveRegime(model:any) {
    return this.http.post<SocieteDto>(this.serverUrl + 'create', model);
  }

  delete(societeId: number) {
    return this.http.delete(this.serverUrl + 'delete/' + societeId);
  }

 /* findSocieteByIdUser(userId : number){
    return this.http.get(this.serverUrl + 'find/' + userId)
  }*/

  findSocieteByIdUser(userId: number | undefined): Observable<any> {
    return this.http.get(`${this.serverUrl}find/${userId}`);
  }
}
