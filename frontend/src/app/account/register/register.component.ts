import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { RouterExtService } from '../../_services/router.ext.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  returnUrl:String;

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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registerUser() {
    // TODO: implement
    /*this.usersService.registerUser(this.registerForm.value)
      .subscribe(data => this.router.navigate(['/']));*/
  }

}
