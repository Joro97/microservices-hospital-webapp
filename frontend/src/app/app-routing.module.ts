import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'doctors', loadChildren: './doctors/doctors.module#DoctorsModule' },
  { path: 'login', loadChildren: './account/account.module#AccountModule' },
  { path: 'register', loadChildren: './account/account.module#AccountModule'},
  // uris that do not match any previous path should redirect to home
  { path: '**', loadChildren: './home/home.module#HomeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
