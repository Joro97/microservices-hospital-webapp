import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { AppointmentService } from '../../core/services/appointment.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-booked-hours',
  templateUrl: './booked-hours.component.html',
  styleUrls: ['./booked-hours.component.css']
})
export class BookedHoursComponent implements OnInit {
  bookedHours: Moment[];

  constructor(
    private authenticationService: AuthenticationService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    this.setFreeHours();
  }

  setFreeHours() {
    const userName = this.authenticationService.getCurrentUser().user_name;
    this.appointmentService.getPatientsBookedHours(userName)
      .subscribe(hours => this.bookedHours = hours);
  }
}
