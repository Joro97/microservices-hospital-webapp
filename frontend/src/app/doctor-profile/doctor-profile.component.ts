import { Component, OnInit } from '@angular/core';
import { Doctor } from '../_models/doctor';
import { DoctorService } from '../_services/doctor.service';
import {User} from '../_models/user';
import {FileService} from '../_services/file.service';
import { AuthenticationService } from '../_services/authentication.service';

const blacklisted = ['id', 'role', 'token'];

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor: Doctor;
  userDetails: User;
  avatar: any;
  isImageLoading: boolean;

  constructor(
    private doctorService: DoctorService,
    private fileService: FileService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
   this.getAdditionalDoctorInfo();
  }

  getAdditionalDoctorInfo() {
    this.userDetails = JSON.parse(localStorage.getItem('currentUser'));

    this.doctorService.getDoctor(this.authenticationService.getCurrentUser().user_name)
      .subscribe(doc => {
        this.doctor = doc;
      });

    this.isImageLoading = true;
    this.fileService.getAvatar(this.doctor.username)
      .subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.avatar = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
