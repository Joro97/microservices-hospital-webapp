import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { AppointmentService } from '../../core/services/appointment.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { Doctor } from '../../core/models/doctor';
import { DoctorService } from '../../core/services/doctor.service';
declare var $: any;

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
export class AppointmentComponent implements OnInit, OnDestroy {
  public doctor: Doctor;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  isDocLoaded = false;
  clickedDate: Moment = moment(moment().format('YYYY-MM-DDTHH:mm:ss'), moment.ISO_8601, true);
  freeHours: Moment[];
  takenHours: Moment[];
  private ngUnsubscribe: Subject<any> = new Subject();

  private dayClickedFlag: boolean;

  constructor(
    private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dayClickedFlag = false;
    const doctorUsername = this.route.snapshot.params['username'];
    this.doctorService.getDoctor(doctorUsername)
      .subscribe(doctor => {
        this.doctor = doctor;
        console.log(`Inside onInit clickedDate: ${this.clickedDate.clone().format('YYYY-MM-DDTHH:mm:ss')}`);
        this.isDocLoaded = true;
        this.setupScheduleHours();
      });

    $(document).ready(function() {
      $('#hourItems').on('click', '.hourItem', function() {
        $('#hourItems li').css({'border-color': 'gray'});
        $(this).css({'border-color': '#F891BA'});
      });
    });
  }

  setupScheduleHours() {
    this.appointmentService.getTakenHours(this.doctor.username, this.clickedDate)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(hours => {
        this.takenHours = hours;
        this.freeHours = this.appointmentService.buildFreeHours(this.takenHours, this.clickedDate);
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.clickedDate = moment(date, moment.ISO_8601, true);
    this.setupScheduleHours();
    this.dayClickedFlag = true;
  }

  onHourClicked(dateStr: string) {
    this.clickedDate = moment(dateStr, moment.ISO_8601, true);
  }

  appointmentClicked() {
    this.appointmentService.bookHour(this.doctor.username, this.authService.getCurrentUser().user_name, this.clickedDate)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(_ => this.ngOnInit());
  }

  clearDayClickedFlag() {
    this.dayClickedFlag = false;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
