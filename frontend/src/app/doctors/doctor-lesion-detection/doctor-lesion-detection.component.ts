import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FileService} from '../../core/services/file.service';
import {AuthenticationService} from '../../core/services/authentication.service';
import {LesionDetectionService} from '../../core/services/lesion.detection.service';

@Component({
  selector: 'app-doctor-lesion-detection',
  templateUrl: './doctor-lesion-detection.component.html',
  styleUrls: ['./doctor-lesion-detection.component.css']
})

export class DoctorLesionDetectionComponent implements OnInit {

  public lesionDetectForm = new FormGroup({});
  public lesionImage: any;
  private newLesionImage: File;
  public isImageLoading: boolean;

  constructor(
    private fileService: FileService,
    private lesionDetectionService: LesionDetectionService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.newLesionImage = event.target.files[0];
  }

  onSubmit() {

    const token = this.authenticationService.getCurrentAccessToken();
    this.lesionDetectionService.detectLesion(this. newLesionImage, token)
      .subscribe(data => {
        alert(JSON.stringify(data));
        console.log('Successfully detected lesion type!');
      }, error => {
        console.log(`Could not detect lesion type!: Error: ${error}`);
      });
  }
}
