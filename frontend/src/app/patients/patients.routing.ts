import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookedHoursComponent } from './booked-hours/booked-hours.component';
import { Role } from '../core/models/Role';
import { AuthGuard } from '../core/helpers/auth.guard';

const routes: Routes = [
  {
    path: 'appointments',
    component: BookedHoursComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.USER, Role.DOCTOR]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
