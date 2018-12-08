import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DoctorDetailComponent,
    DashboardComponent,
    RegisterComponent,
    DoctorRegisterComponent,
    PatientRegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
