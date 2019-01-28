import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { RouterExtService } from '../../core/services/router.ext.service';
import { ConfirmPasswordValidator } from '../../core/helpers/confirm.password.validator';
import { DoctorService } from '../../core/services/doctor.service';
import { Role } from '../../core/models/Role';
import { first } from 'rxjs/operators';
import { FileService } from '../../core/services/file.service';
import { Doctor } from '../../core/models/doctor';
import { NotificationService } from '../../core/services/notification.service';

const toastrNotifications = {
  docRegisterSuccessMessage: 'Successfully added a new doctor to Princeton Plainsboro.',
  docRegisterSuccessTitle: 'Welcome!',
  docRegisterErrorMessage: 'Failed to add a new doctor. Please try again!',
  docRegisterErrorTitle: 'Error!'
};

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
    private notificationService: NotificationService,
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

    const userToRegister = { // TODO: Make this of type User!
      'username': this.registerForm.value.username,
      'password': this.registerForm.value.password,
      'authorities': [isDoctor ? this.userRole.DOCTOR : this.userRole.USER],
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
      'experience': this.registerForm.get('doctorAdditional').value.experience,
    };

    this.doctorService.registerDoctor(doctorToRegister)
      .pipe(first())
      .subscribe(
        response => {
          this.notificationService.showSuccess(toastrNotifications.docRegisterSuccessMessage, toastrNotifications.docRegisterSuccessTitle);
          this.routerExtService.router.navigate(['/home']);
        },
        error => {
          this.notificationService.showError(toastrNotifications.docRegisterErrorMessage, toastrNotifications.docRegisterErrorTitle);
        }
      );
  }
}
