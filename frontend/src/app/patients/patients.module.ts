import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients.routing';
import { BookedHoursComponent } from './booked-hours/booked-hours.component';

@NgModule({
  declarations: [
    BookedHoursComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ],
  exports: [
    BookedHoursComponent
  ]
})
export class PatientsModule { }
