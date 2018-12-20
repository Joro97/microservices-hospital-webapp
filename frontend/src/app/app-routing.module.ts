import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorsComponent} from './doctors/doctors.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DoctorDetailComponent} from './doctor-detail/doctor-detail.component';
import {DoctorRegisterComponent} from './doctor-register/doctor-register.component';
import {PatientRegisterComponent} from './patient-register/patient-register.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {Role} from './_models/Role';
import {DoctorProfileComponent} from './doctor-profile/doctor-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'detail/:id', component: DoctorDetailComponent },
  {
    path: 'register/doctor',
    component: DoctorRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: Role.Admin } },
  { path: 'register/patient', component: PatientRegisterComponent },
  {
    path: 'profile',
    component: DoctorProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: Role.Doctor }
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
