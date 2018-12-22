import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { DoctorService } from '../_services/doctor.service';
import {FileService} from '../_services/file.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  doctorRegisterForm: FormGroup;
  avatar: File;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private doctorsService: DoctorService,
    private fileService: FileService
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
      return;
    }

    /*this.userService.registerUser(this.userRegisterForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(`Successfully added user: ${data}`);
        },
        error => {
          console.log('Failed to add user');
          console.log(error);
        }
      );*/

    this.doctorRegisterForm.addControl('username', this.userRegisterForm.controls['username']);
    this.doctorsService.registerDoctor(this.doctorRegisterForm.value)
      .pipe(first())
      .subscribe(
        doc => {
          console.log(`Added doctor ${doc}`);
          this.fileService.uploadFile(this.avatar, doc.username)
            .pipe(first())
            .subscribe(data => {
                this.router.navigate(['/login']);
              },
              error => {
                console.log('Failed to upload the image and register doctor');
              });
        },
        errorDoc => {
          console.log('failed to add doctor');
          console.log(errorDoc);
        }
      );
  }

  onFileChanged(event) {
    this.avatar = event.target.files[0];
  }
}
