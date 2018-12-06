import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './doctor';
import {tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerPatientUrl = '';
  private registerDoctorUrl = 'http://localhost:8000/api/register/doctor';

  constructor(
    private http: HttpClient
  ) { }

  registerDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.registerDoctorUrl, doctor, httpOptions)
      .pipe(tap(_ => console.log(`added doctor w/ id=${doctor.id}`)));
  }

  registerPatient(): Observable<any> {
    return;
  }
}
