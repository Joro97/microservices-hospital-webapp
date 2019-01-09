import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { RouterExtService } from '../../core/services/router.ext.service';
import { NotificationService } from '../../core/services/notification.service';

const toastrNotifications = {
  invalidFormMessage: 'Invalid form data. Please try again',
  invalidFormTitle: 'Error',
  loginSuccessMessage: 'Welcome Dr ',
  loginSuccessTitle: 'Princeton Plainsboro'
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private routerExtService: RouterExtService
  ) {
  }

  redirectToRegister() {
    this.routerExtService.router.navigateByUrl(
      this.routerExtService.getCurrentUrl().replace('login', 'register'));
  }

  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.routerExtService.router.navigateByUrl(this.routerExtService.getPreviousUrl());
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.notificationService.showError(toastrNotifications.invalidFormMessage, toastrNotifications.invalidFormTitle);
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value);
    this.notificationService.showSuccess(`${toastrNotifications.loginSuccessMessage} ${this.f.username.value}`,
      toastrNotifications.loginSuccessTitle);
    this.routerExtService.router.navigateByUrl(this.routerExtService.getBaseUrl());
  }
}

