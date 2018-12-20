import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { LoginComponent } from './login/login.component';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import { fakeBackendProvider } from './_interceptors/fake-backend';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DoctorDetailComponent,
    DashboardComponent,
    DoctorRegisterComponent,
    PatientRegisterComponent,
    LoginComponent,
    DoctorProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
