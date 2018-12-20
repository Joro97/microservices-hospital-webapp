import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { DoctorService } from '../_services/doctor.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  doctorRegisterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private doctorsService: DoctorService
  ) { }

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.doctorRegisterForm = this.formBuilder.group({
      specialty: ['', Validators.required],
      experience: [0]
    });
  }

  onSubmit() {
    if (this.userRegisterForm.invalid || this.doctorRegisterForm.invalid) {
      console.log('invalid');
      return;
    }

    this.userService.registerUser(this.userRegisterForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully added user');
        },
        error => {
          console.log('failed to add user');
          console.log(error);
        }
      );
    this.doctorsService.registerDoctor(this.doctorRegisterForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('failed to add doctor');
          console.log(error);
        }
      );
  }
}
