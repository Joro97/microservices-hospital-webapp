import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../_models/doctor';
import { FileService } from '../../_services/file.service';
declare var $: any;

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit {

  private isImageLoading:boolean = true;
  private avatar:any;
  
  private faSpinFast:boolean = false;
  private faArrowLeft:boolean = false;
  private faBars:boolean = true;

  private mcActive:boolean = false;

  @Input() doctor: Doctor;
  constructor(private fileService: FileService) { }

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
      //const card = $(this).parent('.material-card');
      //const icon = $(this).children('i');
      //icon.addClass('fa-spin-fast');

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
