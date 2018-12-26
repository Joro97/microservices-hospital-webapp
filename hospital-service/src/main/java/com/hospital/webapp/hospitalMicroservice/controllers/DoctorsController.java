package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
public class DoctorsController {
    private final DoctorService doctorService;

    @Autowired
    public DoctorsController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/api/doctors")
    public List<Doctor> doctors() {
        return this.doctorService.getAllDoctors();
    }

    @GetMapping("/api/doctors/{id}")
    public Doctor getDoctorById(@PathVariable long id) {
        return this.doctorService.getDoctorById(id);
    }

    @PostMapping("/api/doctors/register")
    public Doctor registerDoctor(@RequestBody Doctor doctor) {
        return this.doctorService.registerDoctor(doctor);
    }

    @PostMapping("/api/schedule/{username}")
    public List<LocalTime> getDoctorFreeHours(@PathVariable String username, @RequestBody LocalDateTime dateTime) {
        return this.doctorService.handleFreeHoursRequest(username, dateTime);
    }

    @PostMapping("api/book/{doctorUsername}/{patientUsername}")
    public void bookHour(@PathVariable String doctorUsername, @PathVariable String patientUsername,
                         @RequestBody LocalDateTime dateTime) {
        this.doctorService.bookAppointment(doctorUsername, patientUsername, dateTime);
    }
}