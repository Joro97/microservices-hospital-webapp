import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { User } from '../user';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  doctors: Doctor[];

  constructor(
    private doctorService: DoctorService,
    private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getDoctors();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  getDoctors(): void {
      this.doctorService.getDoctors().subscribe(doctors => this.doctors = doctors);
  }
}
