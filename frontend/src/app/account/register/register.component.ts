import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { RouterExtService } from '../../_services/router.ext.service';
import { ConfirmPasswordValidator } from '../../_validators/confirm.password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // TODO: delete UserService, move register to Auth Service.
    private usersService: UserService,
    private authenticationService: AuthenticationService,
    private routerExtService: RouterExtService
  ) {
    if (this.authenticationService.isUserLoggedIn()) {
      this.routerExtService.router.navigateByUrl(this.routerExtService.getPreviousUrl());
    }
  }

  redirectToLogin() {
    this.routerExtService.router.navigateByUrl(
      this.routerExtService.getCurrentUrl().replace('register', 'login'));
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  registerUser() {
    if (this.registerForm.invalid) {
      alert("Invalid form data !")
      return;
    }
  
    const userToRegister = {
      'username': this.registerForm.value.username,
      'password': this.registerForm.value.password,
      'roles': ['USER'],
      'enabled': true
    }

    this.authenticationService.registerUser(userToRegister);
    this.redirectToLogin();
  }

}
