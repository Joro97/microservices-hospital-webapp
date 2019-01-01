import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Doctor } from '../_models/doctor';
import { environment } from '../../environments/environment.prod';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }


  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${environment.hospitalApiUrl}${environment.doctorsUrl}`)
      .pipe(
        catchError(this.handleError('getDoctors', []))
      );
  }

  getDoctor(username: String): Observable<Doctor> {
    const url = `${environment.hospitalApiUrl}${environment.doctorsUrl}/${username}/profile`;
    return this.http.post<Doctor>(url, { username: username })
      .pipe(catchError(this.handleError<Doctor>(`Failed to get doctor with username: ${username}`)));
  }

  registerDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${environment.hospitalApiUrl}${environment.doctorsUrl}`, doctor, httpOptions)
      .pipe(tap(_ => console.log(`Added new doctor`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
