package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.Patient;
import com.hospital.webapp.hospitalMicroservice.models.view.PatientRegisterRequestModel;

public interface PatientService {
    Patient registerPatient(PatientRegisterRequestModel model);
}
