package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.repositories.PatientsRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PatientServiceImpl implements PatientService {
    private final PatientsRepository patientsRepository;

    @Autowired
    public PatientServiceImpl(PatientsRepository patientsRepository) {
        this.patientsRepository = patientsRepository;
    }
}
