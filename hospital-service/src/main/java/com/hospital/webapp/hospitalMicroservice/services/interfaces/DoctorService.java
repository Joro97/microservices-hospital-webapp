package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface DoctorService {
    List<Doctor> getAllDoctors();
    void registerDoctor(Doctor doctor) throws IllegalArgumentException, IOException;
    Doctor getByUsername(String username);
    /*List<ScheduleHour> getFreeScheduleHours(String username, LocalDateTime dateTime);
    List<LocalTime> parseScheduleHoursToTimes(List<ScheduleHour> scheduleHours);
    List<LocalTime> handleFreeHoursRequest(String username, LocalDateTime dateTime);*/
    List<ScheduleHour> getBookedHours(String username, LocalDateTime dateTime);
    void bookAppointment(String doctorUsername, String patientUsername, LocalDateTime dateTime);
}
