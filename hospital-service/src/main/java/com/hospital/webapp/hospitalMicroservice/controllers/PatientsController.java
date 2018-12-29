package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.ScheduleHourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientsController {
    private final ScheduleHourService scheduleHourService;

    @Autowired
    public PatientsController(ScheduleHourService scheduleHourService) {
        this.scheduleHourService = scheduleHourService;
    }

    @GetMapping("/appointments/{patientUsername}")
    public List<ScheduleHour> patientAppointments(@PathVariable String patientUsername) {
        return this.scheduleHourService.getPatientsAppointments(patientUsername);
    }
}
