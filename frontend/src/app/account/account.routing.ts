import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // signin & signup components rentered by secondary outlet e.g. "sign"
  { path: 'login', component: LoginComponent, outlet: 'sign' },
  { path: 'register', component: RegisterComponent, outlet: 'sign' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

