import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorsComponent} from './doctors/doctors.component';
import {DoctorDetailComponent} from './doctor-detail/doctor-detail.component';
import {RegisterComponent} from './account/register/register.component';
import {LoginComponent} from './account/login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {Role} from './_models/Role';
import {DoctorProfileComponent} from './doctor-profile/doctor-profile.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './doctors/appointment/appointment.component';
import { DoctorLesionDetectionComponent } from './doctor-lesion-detection/doctor-lesion-detection.component';

const routes: Routes = [
  { path: 'doctors', component: DoctorsComponent },
  { path: 'doctors/:username/appointment', component: AppointmentComponent},
  { path: 'detail/:id', component: DoctorDetailComponent },
  { path: 'lesion',
    component: DoctorLesionDetectionComponent,
    canActivate: [AuthGuard],
    data: { roles: Role.DOCTOR }
  },
  {
    path: 'profile',
    component: DoctorProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: Role.DOCTOR }
  },

  // signin & signup components rentered by secondary outlet e.g. "sign"
  { path: 'login', component: LoginComponent, outlet: 'sign' },
  { path: 'register', component: RegisterComponent, outlet: 'sign' },

  // uris that do not match any previous path should redirect to home
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
