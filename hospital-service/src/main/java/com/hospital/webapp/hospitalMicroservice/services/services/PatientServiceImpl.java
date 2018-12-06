package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.Patient;
import com.hospital.webapp.hospitalMicroservice.models.view.PatientRegisterRequestModel;
import com.hospital.webapp.hospitalMicroservice.repositories.PatientsRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PatientServiceImpl implements PatientService, UserDetailsService {
    private final PatientsRepository patientsRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PatientServiceImpl(PatientsRepository patientsRepository,
                              PasswordEncoder passwordEncoder) {
        this.patientsRepository = patientsRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public Patient registerPatient(PatientRegisterRequestModel model) {
        Patient patient = new Patient();
        patient.setUserName(model.getUserName());
        patient.setPassword(this.passwordEncoder.encode(model.getPassword()));
        return this.patientsRepository.save(patient);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }
}
