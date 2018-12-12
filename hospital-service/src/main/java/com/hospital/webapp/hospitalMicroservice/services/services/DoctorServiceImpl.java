package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.repositories.DoctorsRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
    private final DoctorsRepository doctorsRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DoctorServiceImpl(DoctorsRepository doctorsRepository, PasswordEncoder passwordEncoder) {
        this.doctorsRepository = doctorsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return this.doctorsRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(long id) {
        return this.doctorsRepository.getOne(id);
    }

    @Override
    public Doctor registerDoctor(Doctor doctor) {
        doctor.setPassword(this.passwordEncoder.encode(doctor.getPassword()));
        return this.doctorsRepository.save(doctor);
    }

}
