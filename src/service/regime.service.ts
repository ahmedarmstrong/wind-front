import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegimeDto} from "../interface/regimeDto";



@Injectable({ providedIn: 'root' })
export class RegimeService {


    constructor(private http: HttpClient) { }

    serverUrl = 'http://localhost:9191/fiche-paie/api/regime/';

    findAll() {

      return   this.http.get<RegimeDto[]>
        (this.serverUrl + 'all')
    };

    saveRegime(model:any) {
        return this.http.post<RegimeDto>(this.serverUrl + 'create', model);
    }

    delete(regimeId: number) {
        return this.http.delete(this.serverUrl + 'delete/' + regimeId);
    }
}
