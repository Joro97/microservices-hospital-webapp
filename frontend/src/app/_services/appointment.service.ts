import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient
  ) { }

  bookHour(docUsername: String, patientUsername: String, dateTime: Date) {
    const url = `${environment.hospitalApiUrl}${environment.appointmentBookingUrl}/${docUsername}/${patientUsername}`;
    return this.http.post(url, { dateTime: dateTime });
  }
}
