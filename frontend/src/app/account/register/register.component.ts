import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { RouterExtService } from '../../_services/router.ext.service';
import { ConfirmPasswordValidator } from '../../_validators/confirm.password.validator';
import { DoctorService } from '../../_services/doctor.service';
import { Role } from '../../_models/Role';
import { first } from 'rxjs/operators';
import { FileService } from '../../_services/file.service';
import {Doctor} from '../../_models/doctor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public shouldAddDoctorInfo: boolean;
  public userRole = Role;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    private doctorService: DoctorService,
    private fileService: FileService,
    private routerExtService: RouterExtService
  ) {
  }

  redirectToLogin() {
    this.routerExtService.router.navigateByUrl(
      this.routerExtService.getCurrentUrl().replace('register', 'login'));
  }

  ngOnInit() {
    this.setAdditionalDoctorInfo();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      doctorAdditional: this.formBuilder.control({
        specialty: [],
        experience: []
      }, Validators.required)
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  setAdditionalDoctorInfo() {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.shouldAddDoctorInfo = false;
    } else if (this.authenticationService.isUserLoggedIn() && this.authenticationService.userHasRole(Role.ADMIN)) {
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
      'roles': [isDoctor ? this.userRole.DOCTOR : this.userRole.USER],
      'enabled': true
    };
    this.authenticationService.registerUser(userToRegister);

    if (isDoctor) {
      this.registerDoctor();
    }

    this.redirectToLogin();
  }

  registerDoctor() {
    const docUsername = this.registerForm.get('username').value;
    const doctorToRegister: Doctor = {
      'username': docUsername,
      'specialty': this.registerForm.get('doctorAdditional').value.specialty,
      'experience': this.registerForm.get('doctorAdditional').value.experience
    };
    console.log(this.registerForm.get('doctorAdditional'));
    this.doctorService.registerDoctor(doctorToRegister)
      .pipe(first())
      .subscribe(
        response => {
          console.log(`Added doctor`);
          this.routerExtService.router.navigate(['/home']);
        },
        errorDoc => {
          console.log('Failed to add doctor');
          console.log(errorDoc);
        }
      );
  }
}
