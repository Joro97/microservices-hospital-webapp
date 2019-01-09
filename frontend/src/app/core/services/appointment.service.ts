import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ScheduleMoment } from '../models/scheduleMoment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient
  ) { }

  bookHour(docUsername: String, patientUsername: String, dateTime: Moment): Observable<any> {
    const url = `${environment.hospitalApiUrl}${environment.appointmentBookingUrl}/${docUsername}/${patientUsername}`;
    return this.http.post(url, { dateTime: dateTime.format('YYYY-MM-DDTHH:mm:ss') })
      .pipe(tap(response => console.log(response)));
  }

  getTakenHours(docUsername: String, dateTime: Moment): Observable<Moment[]> {
    const url = `${environment.hospitalApiUrl}${environment.doctorHoursUrl}/${docUsername}`;
    return this.http.post<ScheduleMoment[]>(url, { dateTime: dateTime.format('YYYY-MM-DDTHH:mm:ss') }, httpOptions)
      .pipe(map(hoursArr => {
         return hoursArr.map(scheduleMoment => moment(scheduleMoment.dateTime));
      }));
  }

  buildFreeHours(takenHours: Moment[], dateTime: Moment): Moment[] {
    const currWorkHour = dateTime.clone().hour(9).minutes(0).seconds(0);
    const workdayEnd = dateTime.clone().hour(11).minutes(3).seconds(0);
    const freeHours: Moment[] = [];

    while (currWorkHour.isBefore(workdayEnd)) {
      let shouldAdd = true;
      for (let i = 0; i < takenHours.length; i++) {
        if (currWorkHour.isSame(takenHours[i])) {
          shouldAdd = false;
          break;
        }
      }

      if (shouldAdd) {
        freeHours.push(currWorkHour.clone());
      }
      currWorkHour.add(30, 'minutes');
    }

    return freeHours;
  }
}
