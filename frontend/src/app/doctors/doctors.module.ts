import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppointmentComponent } from './appointment/appointment.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { DoctorLesionDetectionComponent } from './doctor-lesion-detection/doctor-lesion-detection.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorsRoutingModule } from './doctors.routing';
import { DoctorsComponent } from './doctors.component';

@NgModule({
  declarations: [
    DoctorsComponent,
    AppointmentComponent,
    DoctorCardComponent,
    DoctorLesionDetectionComponent,
    DoctorProfileComponent
  ],
  imports: [
    DoctorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FlexLayoutModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [
    DoctorsComponent,
    AppointmentComponent,
    DoctorCardComponent,
    DoctorLesionDetectionComponent,
    DoctorProfileComponent,
  ]
})
export class DoctorsModule {}
