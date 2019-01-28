package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.DBFile;
import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;
import com.hospital.webapp.hospitalMicroservice.repositories.DoctorsRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
    private final DoctorsRepository doctorsRepository; //TODO: Add some exception handling

    @Autowired
    public DoctorServiceImpl(DoctorsRepository doctorsRepository) {
        this.doctorsRepository = doctorsRepository;
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return this.doctorsRepository.findAll();
    }

    @Override
    public void registerDoctor(Doctor doctor) throws IllegalArgumentException, IOException {
        if (this.doctorsRepository.findByUsername(doctor.getUsername()) != null) {
            throw new IllegalArgumentException(String.format("Doctor with username %s already exists!",
                    doctor.getUsername()));
        }

        doctor.setScheduleHours(new HashSet<>());
        if (doctor.getAvatar() == null) {
            String fileName = "/src/main/resources/doctor-default-image.png";
            File defaultAvatar = new File(System.getProperty("user.dir") + fileName);
            DBFile dbFile = new DBFile(fileName,
                    Files.probeContentType(defaultAvatar.toPath()), Files.readAllBytes(defaultAvatar.toPath()));
            doctor.setAvatar(dbFile);
        }
        this.doctorsRepository.save(doctor);
    }

    @Override
    public Doctor updateDoctor(Doctor oldDoctor) {
        System.out.println(String.format("Old doc name: %s, likes %s", oldDoctor.getUsername(), oldDoctor.getLikes()));
        Doctor newDoctor = this.getByUsername(oldDoctor.getUsername());
        newDoctor.setLikes(oldDoctor.getLikes());
        System.out.println(String.format("New doc name: %s, likes %s", newDoctor.getUsername(), newDoctor.getLikes()));
        return this.doctorsRepository.save(newDoctor);
    }

    @Override
    public Doctor getByUsername(String username) {
        return this.doctorsRepository.findByUsername(username);
    }

    @Override
    public List<ScheduleHour> getBookedHours(String username, LocalDateTime dateTime) {
        Doctor doctor = this.doctorsRepository.findByUsername(username);
        LocalDate date = dateTime.toLocalDate();
        return doctor.getScheduleHours()
                .stream()
                .filter(x -> x.getDateTime().toLocalDate().equals(date))
                .collect(Collectors.toList());
    }

    @Override
    public void bookAppointment(String doctorUsername, String patientUsername, LocalDateTime dateTime) {
        ScheduleHour bookedHour = new ScheduleHour(dateTime);
        bookedHour.setPatientUsername(patientUsername);

        Doctor doctor = this.doctorsRepository.findByUsername(doctorUsername);
        doctor.getScheduleHours().add(bookedHour);
        bookedHour.setDoctor(doctor);
        this.doctorsRepository.save(doctor);
    }
}
