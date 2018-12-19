import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from '../_models/doctor';
import { DoctorService } from '../_services/doctor.service';
import { User } from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {
  // currentUser: User;
  // currentUserSubscription: Subscription;
  doctors: Doctor[];
  filteredDoctors: Doctor[];

  constructor(
    private doctorService: DoctorService,
    private authenticationService: AuthenticationService) {
/*    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });*/
  }

  ngOnInit() {
    // this.getDoctors();
    // Some mock data below to test the search bar
    this.doctors = [
      {'id': 2, 'username': 'Joro', 'specialty': 'cardio-surgeon'},
      {'id': 3, 'username': 'Ivan', 'specialty': 'neuro-surgeon'},
      {'id': 1, 'username': 'Ogi M.D', 'specialty': 'special diagnostics'},
      {'id': 4, 'username': 'Teodor', 'specialty': 'YNT'},
    ];
    this.filteredDoctors = this.doctors;
  }

  ngOnDestroy(): void {
    // this.currentUserSubscription.unsubscribe();
  }

  getDoctors(): void {
      this.doctorService.getDoctors().subscribe(doctors => this.doctors = doctors);
  }

  valueChange(searchText: string) {
    const filter = searchText.toLowerCase();
    this.filteredDoctors = this.doctors.filter(
        d => d.username.toLowerCase().includes(filter) || d.specialty.toLowerCase().includes(filter)
    );
  }
}
