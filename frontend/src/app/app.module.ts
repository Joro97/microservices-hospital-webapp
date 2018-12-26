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
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { fakeBackendProvider } from './_interceptors/fake-backend';
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
import { DarkoutComponent } from './account/darkout/darkout.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DoctorDetailComponent,
    DashboardComponent,
    DoctorRegisterComponent,
    RegisterComponent,
    LoginComponent,
    DoctorProfileComponent,
    NavbarComponent,
    VideoComponent,
    HomeComponent,
    DarkoutComponent
  ],
  imports: [
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
    FlexLayoutModule
  ],
  providers: [
    fakeBackendProvider,
    RouterExtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  /* To store the current variable as soon as possible,
   it's necessary to use the service in the AppModule. */
  constructor(private routerExtService: RouterExtService){}
}
