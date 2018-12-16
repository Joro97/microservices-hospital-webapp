package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;

import java.util.List;

public interface DoctorService {
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(long id);
    Doctor registerDoctor(Doctor doctor);
}
