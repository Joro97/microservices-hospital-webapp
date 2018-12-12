import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { RegisterComponent } from './register/register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'detail/:id', component: DoctorDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/doctor', component: DoctorRegisterComponent },
  { path: 'register/patient', component: PatientRegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
