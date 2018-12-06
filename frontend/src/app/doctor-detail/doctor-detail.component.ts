import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})

export class DoctorDetailComponent implements OnInit {
  @Input() doctor: Doctor;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.getDoctor();
  }

  getDoctor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.doctorService.getDoctor(id)
      .subscribe(doctor => this.doctor = doctor);
  }

  goBack(): void {
    this.location.back();
  }
}
