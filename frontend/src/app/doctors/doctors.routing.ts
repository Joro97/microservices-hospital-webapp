import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DoctorLesionDetectionComponent } from './doctor-lesion-detection/doctor-lesion-detection.component';
import { AuthGuard } from '../core/helpers/auth.guard';
import { Role } from '../core/models/Role';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';

const routes: Routes = [
  { path: '', component: DoctorsComponent },
  { path: ':username/appointment', component: AppointmentComponent},
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
