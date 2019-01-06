import { Component, OnInit } from '@angular/core';
import { Doctor } from '../_models/doctor';
import { DoctorService } from '../_services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[];
  filteredDoctors: Doctor[];

  constructor(
    private doctorService: DoctorService,
  ) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors(): void {
      this.doctorService.getDoctors().subscribe(doctors => {
           this.doctors = doctors;
           this.filteredDoctors = this.doctors;
        });
  }

  valueChange(searchText: string) {
    const filter = searchText.toLowerCase();
    this.filteredDoctors = this.doctors.filter(
      d => d.username.toLowerCase().includes(filter) || d.specialty.toLowerCase().includes(filter));
  }
}
