package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.view.DoctorRegisterRequestModel;
import com.hospital.webapp.hospitalMicroservice.repositories.DoctorsRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService, UserDetailsService {
    private final DoctorsRepository doctorsRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DoctorServiceImpl(DoctorsRepository doctorsRepository,
                             PasswordEncoder passwordEncoder) {
        this.doctorsRepository = doctorsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Doctor registerDoctor(DoctorRegisterRequestModel model) {
        //System.out.println(String.format("%s %s", model.getUserName(), model.getPassword()));
        Doctor doctor = new Doctor();
        doctor.setUserName(model.getuserName());
        doctor.setPassword(this.passwordEncoder.encode(model.getPassword()));
        return this.doctorsRepository.save(doctor);
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
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }
}
