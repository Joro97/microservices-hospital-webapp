import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './doctor';
import { tap } from 'rxjs/operators';
import { User } from './user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUserUrl = 'http://localhost:8000/api/patients/register';
  private registerDoctorUrl = 'http://localhost:8000/api/doctors/register';

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUserUrl, user, httpOptions)
      .pipe(tap(_ => console.log(`added patient w/ id=${user.id}`)));
  }

  registerDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.registerDoctorUrl, doctor, httpOptions)
      .pipe(tap(_ => console.log(`added doctor with id=${doctor.id}`)));
  }
}
