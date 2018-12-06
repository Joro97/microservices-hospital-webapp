import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Doctor } from './doctor';


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

  getDoctor(id: number): Observable<Doctor> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.get<Doctor>(url).pipe(
      catchError(this.handleError<Doctor>('getDoctor id=${id}'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
