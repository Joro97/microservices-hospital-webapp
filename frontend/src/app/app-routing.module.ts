import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorsComponent} from './doctors/doctors.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DoctorDetailComponent} from './doctor-detail/doctor-detail.component';
import {DoctorRegisterComponent} from './doctor-register/doctor-register.component';
import {RegisterComponent} from './account/register/register.component';
import {LoginComponent} from './account/login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {Role} from './_models/Role';
import {DoctorProfileComponent} from './doctor-profile/doctor-profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'detail/:id', component: DoctorDetailComponent },
  {
    path: 'register/doctor',
    component: DoctorRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: Role.ADMIN } },
  {
    path: 'profile',
    component: DoctorProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: Role.DOCTOR }
  },

  // signin & signup components rentered by secondary outlet e.g. "sign"
  { path: 'login', component: LoginComponent, outlet: "sign" },
  { path: 'register', component: RegisterComponent, outlet: "sign" },

  // uris that do not match any previous path should redirect to home
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
