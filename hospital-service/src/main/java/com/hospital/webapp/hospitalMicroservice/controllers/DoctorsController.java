package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DoctorsController {
    private final DoctorService doctorService;

    @Autowired
    public DoctorsController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/doctors")
    public List<Doctor> doctors() {
        return this.doctorService.getAllDoctors();
    }

    @PostMapping("/doctors")
    public ResponseEntity registerDoctor(@RequestBody Doctor doctor) {
        try {
            this.doctorService.registerDoctor(doctor);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/schedules/{username}")
    public List<ScheduleHour> getDoctorBookedHours(@PathVariable String username, @RequestBody ScheduleHour dateTime) {
        return this.doctorService.getBookedHours(username, dateTime.getDateTime());
    }

    @PostMapping("/book/{doctorUsername}/{patientUsername}")
    public void bookHour(@PathVariable String doctorUsername, @PathVariable String patientUsername,
                         @RequestBody ScheduleHour dateTime) {
        this.doctorService.bookAppointment(doctorUsername, patientUsername, dateTime.getDateTime());
    }
}