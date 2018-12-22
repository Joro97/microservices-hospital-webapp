import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const fileUploadUrl = 'http://localhost:8000/api/upload/image';
const fileRetrievalUrl = 'http://localhost:8000/api/image';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: File, username: string): Observable<any> {
    const avatarFormData = new FormData();
    avatarFormData.append('file', file, file.name);
    const uploadUrl = `${fileUploadUrl}/${username}`;
    return this.http.post<any>(uploadUrl, avatarFormData);
  }

  getAvatar(docUsername: string): Observable<Blob> {
    const headers = new HttpHeaders('Cache-Control: max-age=3600');
    return this.http.get(`${fileRetrievalUrl}/${docUsername}`, {responseType: 'blob', headers: headers});
  }
}
