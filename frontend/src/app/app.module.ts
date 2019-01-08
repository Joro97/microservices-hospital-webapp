import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoComponent } from './home/video/video.component';
import { HomeComponent } from './home/home.component';
import { RouterExtService } from './_services/router.ext.service';
import { DoctorCardComponent } from './doctors/doctor-card/doctor-card.component';
import { AppointmentComponent } from './doctors/appointment/appointment.component';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { IconsrowComponent } from './home/iconsrow/iconsrow.component';
import { DoctorLesionDetectionComponent } from './doctor-lesion-detection/doctor-lesion-detection.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DoctorDetailComponent,
    DoctorProfileComponent,
    NavbarComponent,
    VideoComponent,
    HomeComponent,
    DoctorCardComponent,
    AppointmentComponent,
    IconsrowComponent,
    DoctorLesionDetectionComponent
  ],
  imports: [
    AccountModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxPaginationModule
  ],
  providers: [
    RouterExtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  /* To store the current variable as soon as possible,
   it's necessary to use the service in the AppModule. */
  constructor(private routerExtService: RouterExtService) {}
}
