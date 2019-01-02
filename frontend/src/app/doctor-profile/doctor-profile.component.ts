import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  public avatarUpdateForm = new FormGroup({});
  public avatar: any;
  private newAvatar: File;
  public isImageLoading: boolean;

  constructor(
    private fileService: FileService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
   this.getAdditionalDoctorInfo();
  }

  getAdditionalDoctorInfo() {
    const docUsername = this.authenticationService.getCurrentUser().user_name;
        this.isImageLoading = true;
        this.fileService.getAvatar(docUsername)
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

  onFileChanged(event) {
    this.newAvatar = event.target.files[0];
  }

  onSubmit() {
    console.log('here');
    const docUsername = this.authenticationService.getCurrentUser().user_name;
    this.fileService.updateAvatar(this.newAvatar, docUsername)
      .subscribe(data => {
          console.log('Successfully updated avatar!');
          this.ngOnInit();
      }, error => {
          console.log(`Could not update avatar!: Error: ${error}`);
      });
  }
}
