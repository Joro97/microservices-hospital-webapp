import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../core/models/doctor';
import { FileService } from '../../core/services/file.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit {

  private isImageLoading = true;
  private avatar: any;

  private faSpinFast = false;
  private faArrowLeft = false;
  private faBars = true;

  private mcActive = false;

  @Input() doctor: Doctor;
  constructor(
    private authService: AuthenticationService,
    private fileService: FileService,
    ) { }

  ngOnInit() {
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

  onClick() {
      this.faSpinFast = true;

      if (this.mcActive) {
        this.mcActive = false;

        setTimeout(() => {
          this.faArrowLeft = false;
          this.faSpinFast = false;
          this.faBars = true;
        }, 800);
      } else {
         this.mcActive = true;

        setTimeout(() => {
          this.faArrowLeft = true;
          this.faSpinFast = false;
          this.faBars = false;
        }, 800);

      }

  }

}
