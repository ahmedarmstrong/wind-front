import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {UploadResponseDto} from "../interface/UploadResponseDto";
import {Pointage} from "../interface/pointage";
import {PointageDto} from "../interface/pointageDto";




@Injectable({ providedIn: 'root' })
export class FileService {


  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:9191/payroll/api/file/upload';
  serverUrll = 'http://localhost:9191/payroll/api/file/replace-duplicates';

  uploadFile(file: File): Observable<UploadResponseDto> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<UploadResponseDto>(this.serverUrl, formData);
  }

  replaceDuplicates(pointages: PointageDto[]): Observable<UploadResponseDto> {
    return this.http.post<UploadResponseDto>(this.serverUrll, pointages);
  }


}
