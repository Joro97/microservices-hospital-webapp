import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import {JwtToken} from '../models/jwt.token';

@Injectable({
  providedIn: 'root'
})
export class LesionDetectionService {
  constructor(
    private http: HttpClient
  ) { }

  detectLesion(lesionImage: File, token: JwtToken): Observable<any> {
    const lesionFormData = new FormData();

    lesionFormData.append('image', lesionImage, lesionImage.name);

    lesionFormData.append('auth_token', token.access_token);

    const uploadUrl = `${environment.lesionDetectionApiUrl}${environment.lesionUrl}`;

    const res = this.http.post<any>(uploadUrl, lesionFormData);

    console.log('result retrieved: ' + res);

    return res;
  }
}
