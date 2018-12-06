package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.view.DoctorRegisterRequestModel;

import java.util.List;

public interface DoctorService {
    Doctor registerDoctor(DoctorRegisterRequestModel model);
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(long id);
}
