import { Component, OnInit } from '@angular/core';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors(): void {
      this.doctorService.getDoctors().subscribe(doctors => this.doctors = doctors);
  }
}
