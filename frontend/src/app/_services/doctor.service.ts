import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Doctor } from '../_models/doctor';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorsUrl = 'http://localhost:8000/api/doctors';

  constructor(
    private http: HttpClient
  ) { }


  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorsUrl)
      .pipe(
        catchError(this.handleError('getDoctors', []))
      );
  }

/*  getDoctor(id: number): Observable<Doctor> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.get<Doctor>(url).pipe(
      catchError(this.handleError<Doctor>('getDoctor id=${id}'))
    );
  }*/

  getDoctor(username: string): Observable<Doctor> {
    const url = `${this.doctorsUrl}/${username}/profile`;
    return this.http.post<Doctor>(url, { username: username })
      .pipe(catchError(this.handleError<Doctor>('failD')));
  }

  registerDoctor(doctor: Doctor): Observable<Doctor> {
    const registerDoctorUrl = `${this.doctorsUrl}/register`;
    return this.http.post<Doctor>(registerDoctorUrl, doctor, httpOptions)
      .pipe(tap(_ => console.log(`added doctor with id=${doctor.id}`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
