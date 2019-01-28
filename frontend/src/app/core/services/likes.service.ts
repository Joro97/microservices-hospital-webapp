import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(
    private http: HttpClient
  ) { }

  getDoctorsLikes(doctorUsername: String): Observable<number> {
    const url = `${environment.hospitalApiUrl}${environment.likesRetrievalUrl}/${doctorUsername}`;
    return this.http.get<number>(url)
      .pipe(tap(likes => console.log(`Doctor ${doctorUsername} has ${likes} likes`)));
  }

  getPatientLikesForDoc(doctorUsername: String, patientUsername: String): Observable<number> {
    const url = `${environment.hospitalApiUrl}${environment.likesRetrievalUrl}/${doctorUsername}`;
    return this.http.post<number>(url, patientUsername)
      .pipe(tap(patientLikes => console.log(`Patient ${patientUsername} likes for ${doctorUsername}: ${patientLikes}`)));
  }

  canPatientLikeDoctor(doctorUsername: String, patientUsername: String): Observable<boolean> {
    const url = `${environment.hospitalApiUrl}${environment.likesRetrievalUrl}/add/${doctorUsername}`;
    return this.http.post<boolean>(url, patientUsername)
      .pipe(tap(canLike => console.log(`Patient ${patientUsername} can like doctor ${doctorUsername}? ${canLike}`)));
  }
}
