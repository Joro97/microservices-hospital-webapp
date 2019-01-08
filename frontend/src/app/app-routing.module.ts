import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'doctors', loadChildren: './doctors/doctors.module#DoctorsModule' },
  { path: 'login', loadChildren: './account/account.module#AccountModule',  },
  { path: 'register', loadChildren: './account/account.module#AccountModule'},
  // uris that do not match any previous path should redirect to home
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
