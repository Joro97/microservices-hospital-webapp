import { Component, OnInit } from '@angular/core';
import { Doctor } from '../_models/doctor';
import { DoctorService } from '../_services/doctor.service';
import {User} from '../_models/user';

const blacklisted = ['id', 'role', 'token'];

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor: Doctor;
  userDetails: User;

  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit() {
   this.getAdditionalDoctorInfo();
  }

  getAdditionalDoctorInfo() {
    this.userDetails = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userDetails);
    this.doctorService.getDoctor(this.userDetails.username)
      .subscribe(doc => {
        this.doctor = doc;
        console.log(doc);
      });
  }
}
