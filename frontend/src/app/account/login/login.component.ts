import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { RouterExtService } from '../../_services/router.ext.service';

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
      alert('Invalid form data !');
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value);
    this.routerExtService.router.navigateByUrl(this.routerExtService.getBaseUrl());
  }
}

