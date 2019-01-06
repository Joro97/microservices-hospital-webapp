import {Component, OnInit} from '@angular/core';
import { Doctor } from '../_models/doctor';
import { DoctorService } from '../_services/doctor.service';
// declare var $: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[];
  filteredDoctors: Doctor[];

  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.getDoctors();
  }

  applyOnClick() {
    /*$(document).ready(function() {
        $('.material-card > .mc-btn-action').click(function () {
            const card = $(this).parent('.material-card');
            const icon = $(this).children('i');
            icon.addClass('fa-spin-fast');
  
            if (card.hasClass('mc-active')) {
                card.removeClass('mc-active');
  
                window.setTimeout(function() {
                    icon
                        .removeClass('fa-arrow-left')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-bars');
  
                }, 800);
            } else {
                card.addClass('mc-active');
  
                window.setTimeout(function() {
                    icon
                        .removeClass('fa-bars')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-arrow-left');
  
                }, 800);
            }
        });
      });*/
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
        d => d.username.toLowerCase().includes(filter) || d.specialty.toLowerCase().includes(filter)
    );
  }
}
