package com.hospital.webapp.hospitalMicroservice.config;

import com.hospital.webapp.hospitalMicroservice.models.entity.DBFile;
import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DbSeed {
    // TODO: Add Ogi M.D., Bat Joro and Cvetaneca as doctors
    private static final List<String> doctorsNames = Arrays.asList(
            "Gregory House", "Eric Foreman", "James Wilson",
            "Allison Cameron", "Lisa Cuddy", "Remy Hadley", "Robert Chase", "Chris Taub");
    private static final List<String> doctorsSpecialties = Arrays.asList(
            "Diagnostic Medicine", "Neurologist", "Oncologist",
            "Physician Immunologist", "Endocrinologist", "Physician", "Surgeon", "Plastic Surgeon"
    );
    private static final Map<String, String> doctorNameToSpecialty = new HashMap<>();

    private final DoctorService doctorService;

    @Autowired
    public DbSeed(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        for (int i = 0; i < doctorsNames.size(); i++) {
            String currName = doctorsNames.get(i);
            String currSpec = doctorsSpecialties.get(i);

            doctorNameToSpecialty.put(currName, currSpec);
        }

        doctorNameToSpecialty.forEach((name, spec) -> {
            if (this.doctorService.getByUsername(name) == null) {
                Doctor doctor = new Doctor();
                doctor.setUsername(name);
                doctor.setSpecialty(spec);
                String pathToAvatar = "/src/main/resources/doctors-images/" + name + ".jpg";
                try {
                    File avatar = new File(System.getProperty("user.dir") + pathToAvatar);
                    Tika tika = new Tika();
                    DBFile dbFile = new DBFile(pathToAvatar, tika.detect(avatar), Files.readAllBytes(avatar.toPath()));
                    doctor.setAvatar(dbFile);
                    this.doctorService.registerDoctor(doctor);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
