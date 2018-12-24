package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface DoctorService {
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(long id);
    Doctor registerDoctor(Doctor doctor);
    List<ScheduleHour> getFreeScheduleHours(String username, LocalDateTime dateTime);
    List<LocalTime> parseScheduleHoursToTimes(List<ScheduleHour> scheduleHours);
    List<LocalTime> handleFreeHoursRequest(String username, LocalDateTime dateTime);
}
