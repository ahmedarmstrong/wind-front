import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  private apiUrl = 'http://localhost:9191/user-service/api/users';

  getUserPublicContent() {
    return  this.http.request('post','http://localhost:9191/user-service/api/v1/user/resource', {
      withCredentials: true,
      responseType : "text"
    })
  }

  getCountByGrade(grade: string) {
    return this.http.get<number>(`${this.apiUrl}/count?grade=${grade}`);
  }

  getAdminPublicContent() {
    return  this.http.request('get','http://localhost:9191/user-service/api/v1/admin/resource', {
      withCredentials: true,
      responseType : "text"
    })
  }
}
