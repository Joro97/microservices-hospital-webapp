import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private http: HttpClient
  ) { }

  updateAvatar(avatar: File, username: String): Observable<any> {
    const avatarFormData = new FormData();
    avatarFormData.append('file', avatar, avatar.name);
    const uploadUrl = `${environment.hospitalApiUrl}${environment.avatarsUrl}/${username}`;
    return this.http.post<any>(uploadUrl, avatarFormData);
  }

  getAvatar(docUsername: String): Observable<Blob> {
    const headers = new HttpHeaders('Cache-Control: max-age=3600');
    return this.http.get(`${environment.hospitalApiUrl}${environment.avatarsUrl}/${docUsername}`,
      {responseType: 'blob', headers: headers});
  }
}
