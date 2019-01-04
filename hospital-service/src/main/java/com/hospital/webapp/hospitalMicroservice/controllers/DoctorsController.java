package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    public List<LocalTime> getDoctorFreeHours(@PathVariable String username, @RequestBody LocalDateTime dateTime) {
        return this.doctorService.handleFreeHoursRequest(username, dateTime);
    }

    @PostMapping("/book/{doctorUsername}/{patientUsername}")
    public void bookHour(@PathVariable String doctorUsername, @PathVariable String patientUsername,
                         @RequestBody LocalDateTime dateTime) {
        this.doctorService.bookAppointment(doctorUsername, patientUsername, dateTime);
    }
}