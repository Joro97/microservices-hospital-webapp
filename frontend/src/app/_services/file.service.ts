import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

const fileUploadUrl = 'http://localhost:8000/api/upload/image';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: File): Observable<any> {
    const avatarFormData = new FormData();
    avatarFormData.append('file', file, file.name);
    return this.http.post<any>(fileUploadUrl, avatarFormData);
  }
}
