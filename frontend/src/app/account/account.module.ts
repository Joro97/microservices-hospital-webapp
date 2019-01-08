import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DarkoutComponent } from './darkout/darkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { AccountRoutingModule } from './account.routing';

@NgModule({
  declarations: [
    DarkoutComponent,
    LoginComponent,
    RegisterComponent,
    DoctorRegisterComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DarkoutComponent,
    LoginComponent,
    RegisterComponent,
    DoctorRegisterComponent
  ]
})
export class AccountModule { }
