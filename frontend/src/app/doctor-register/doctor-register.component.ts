import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      specialty: ['', Validators.required],
      experience: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('INVALID!!');
    }
    console.log(this.registerForm.value);
    this.userService.registerDoctor(this.registerForm.value)
      .pipe(first())
      .subscribe(data => this.router.navigate(['/']));
  }
}
