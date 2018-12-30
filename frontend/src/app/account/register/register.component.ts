import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {RouterExtService} from '../../_services/router.ext.service';
import {ConfirmPasswordValidator} from '../../_validators/confirm.password.validator';
import {DoctorService} from '../../_services/doctor.service';
import {Role} from '../../_models/Role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public shouldAddDoctorInfo: boolean;
  public userRole = Role;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private doctorService: DoctorService,
    private routerExtService: RouterExtService
  ) {
  }

  redirectToLogin() {
    this.routerExtService.router.navigateByUrl(
      this.routerExtService.getCurrentUrl().replace('register', 'login'));
  }

  ngOnInit() {
    //if (this.authenticationService.isUserLoggedIn()) {
    //  this.routerExtService.router.navigateByUrl(this.routerExtService.getPreviousUrl());
    //}
    this.setAdditionalDoctorInfo();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      doctorAdditional: this.formBuilder.control({
        specialty: [''],
        experience: [0]
      })
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  setAdditionalDoctorInfo() {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.shouldAddDoctorInfo = false;
    } else if (this.authenticationService.isUserLoggedIn()
      && this.authenticationService.userHasRole(Role.ADMIN)) {
      this.shouldAddDoctorInfo = true;
    }
  }

  registerUser(isDoctor: boolean) {
    if (this.registerForm.invalid) {
      alert('Invalid form data !');
      return;
    }

    const userToRegister = {
      'username': this.registerForm.value.username,
      'password': this.registerForm.value.password,
      'roles': [this.userRole.USER],
      'enabled': true
    };
    if (isDoctor) {
      userToRegister['roles'].push(this.userRole.DOCTOR);
    }

    this.authenticationService.registerUser(userToRegister);
    this.redirectToLogin();
  }

  registerDoctor() {
    this.registerUser(true);

  }
}
