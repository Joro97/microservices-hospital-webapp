import { Component, OnInit } from '@angular/core';
import { Doctor } from '../_models/doctor';
import { DoctorService } from '../_services/doctor.service';
import { FileService } from '../_services/file.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  public doctor: Doctor;
  public avatar: any;
  public isImageLoading: boolean;

  constructor(
    private doctorService: DoctorService,
    private fileService: FileService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
   this.getAdditionalDoctorInfo();
  }

  getAdditionalDoctorInfo() {
    this.doctorService.getDoctor(this.authenticationService.getCurrentUser().user_name)
      .subscribe(doc => {
        this.doctor = doc;

        this.isImageLoading = true;
        this.fileService.getAvatar(this.doctor.username)
          .subscribe(data => {
            this.createImageFromBlob(data, this.avatar);
            this.isImageLoading = false;
          }, error => {
            this.isImageLoading = false;
            console.log(error);
          });
      });
  }

  createImageFromBlob(image: Blob, store: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      store = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onFileChanged(event) {
    this.avatar = event.target.files[0];
  }
}
