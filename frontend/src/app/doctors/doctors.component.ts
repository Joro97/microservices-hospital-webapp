import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from '../_models/doctor';
import { DoctorService } from '../_services/doctor.service';
import {AuthenticationService} from '../_services/authentication.service';
declare var $: any;

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
   $(document).ready(function() {
      $('.material-card > .mc-btn-action').click(function () {
          const card = $(this).parent('.material-card');
          const icon = $(this).children('i');
          icon.addClass('fa-spin-fast');

          if (card.hasClass('mc-active')) {
              card.removeClass('mc-active');

              window.setTimeout(function() {
                  icon
                      .removeClass('fa-arrow-left')
                      .removeClass('fa-spin-fast')
                      .addClass('fa-bars');

              }, 800);
          } else {
              card.addClass('mc-active');

              window.setTimeout(function() {
                  icon
                      .removeClass('fa-bars')
                      .removeClass('fa-spin-fast')
                      .addClass('fa-arrow-left');

              }, 800);
          }
      });
    });

    // this.getDoctors();
    // Some mock data below to test the search bar
    this.doctors = [
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
