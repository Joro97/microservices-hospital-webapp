import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      doctorId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('INVALID!!');
    }

    this.userService.registerDoctor(this.registerForm.value)
      .pipe(first())
      .subscribe(data => this.router.navigate(['/']));
  }
}
