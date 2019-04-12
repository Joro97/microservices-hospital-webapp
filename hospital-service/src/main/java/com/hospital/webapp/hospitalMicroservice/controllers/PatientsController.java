package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.ScheduleHourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hospital")
public class PatientsController {
    private final ScheduleHourService scheduleHourService;

    @Autowired
    public PatientsController(ScheduleHourService scheduleHourService) {
        this.scheduleHourService = scheduleHourService;
    }

    @PostMapping("/appointments")
    public List<ScheduleHour> patientAppointments(@RequestBody String patientUsername) {
        return this.scheduleHourService.getPatientsAppointments(patientUsername);
    }
}
