import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnInit {
  registerForm: FormGroup;
  returnUrl:String;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  registerUser() {
    this.usersService.registerUser(this.registerForm.value)
      .subscribe(data => this.router.navigate(['/']));
  }

  public close() {
    this.router.navigate([this.returnUrl]);
  }
}
