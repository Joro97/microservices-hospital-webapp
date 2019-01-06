import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { AppointmentService } from '../../_services/appointment.service';
import { AuthenticationService } from '../../_services/authentication.service';


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

  constructor(
    private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.doctorUsername = this.route.snapshot.params['username'];
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.appointmentService.bookHour(this.doctorUsername, this.authService.getCurrentUser().user_name, new Date(date.toJSON()));
  }
}
