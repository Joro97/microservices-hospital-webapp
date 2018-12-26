package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;

import java.util.List;

public interface ScheduleHourService {
    List<ScheduleHour> getPatientsAppointments(String patientUsername);
}
