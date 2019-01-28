import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Doctor } from '../models/doctor';
import { environment } from '../../../environments/environment.prod';


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
    const url = `${environment.hospitalApiUrl}${environment.doctorsUrl}/${username}`;
    return this.http.get<Doctor>(url, httpOptions)
      .pipe(catchError(this.handleError<Doctor>(`Failed to get doctor with username: ${username}`)));
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${environment.hospitalApiUrl}${environment.doctorsUrl}/${doctor.username}`, doctor, httpOptions)
      .pipe(tap(doc => console.log(doc)));
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
