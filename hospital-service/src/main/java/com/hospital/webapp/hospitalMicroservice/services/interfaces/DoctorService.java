package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface DoctorService {
    List<Doctor> getAllDoctors();
    Doctor getByUsername(String username);
    void registerDoctor(Doctor doctor) throws IllegalArgumentException, IOException;
    Doctor updateDoctor(Doctor doctor);
    List<ScheduleHour> getBookedHours(String username, LocalDateTime dateTime);
    void bookAppointment(String doctorUsername, String patientUsername, LocalDateTime dateTime);
}
