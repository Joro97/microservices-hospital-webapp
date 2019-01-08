import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { AppointmentService } from '../../_services/appointment.service';
import { AuthenticationService } from '../../_services/authentication.service';
import * as moment from 'moment';
import { Moment } from 'moment';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  doctorUsername: String;
  clickedDate: Moment = moment();
  freeHours: Moment[];
  takenHours: Moment[];

  constructor(
    private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.doctorUsername = this.route.snapshot.params['username'];
    console.log(`Inside onInit clickedDate: ${this.clickedDate.clone().format('YYYY-MM-DDTHH:mm:ss')}`);
    this.setupScheduleHours();
  }

  setupScheduleHours() {
    this.appointmentService.getTakenHours(this.doctorUsername, this.clickedDate).
    subscribe(hours => {
      this.takenHours = hours;
      this.freeHours = this.appointmentService.buildFreeHours(this.takenHours, this.clickedDate);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.clickedDate = moment(date, moment.ISO_8601, true);
    this.setupScheduleHours();
  }

  onHourClicked(dateStr: string) {
    this.clickedDate = moment(dateStr, moment.ISO_8601, true);
    alert(`If you want to book ${this.clickedDate.clone().format('HH:mm')} click the button below`);
  }

  appointmentClicked() {
    this.appointmentService.bookHour(this.doctorUsername, this.authService.getCurrentUser().user_name, this.clickedDate)
      .subscribe(_ => this.ngOnInit());
  }
}
