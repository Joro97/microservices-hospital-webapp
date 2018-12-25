package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;
import com.hospital.webapp.hospitalMicroservice.repositories.DoctorsRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
    private static final int WORKING_DAYS = 3;
    private static final int WORKING_HOURS = 4;
    private static final int VISITS_PER_HOUR = 2;
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
    public Doctor getDoctorById(long id) {
        return this.doctorsRepository.findById(id);
    }

    @Override
    public Doctor registerDoctor(Doctor doctor) {
        Set<ScheduleHour> doctorsMonthlyHours = new HashSet<>();
        LocalDate date = LocalDate.now();   //Start from today
        for (int i = 0; i < WORKING_DAYS; i++) {
            LocalTime time = LocalTime.of(9, 0);    //Start the workday from 9AM
            for (int j = 0; j < WORKING_HOURS * VISITS_PER_HOUR; j++) {
                ScheduleHour currHour = new ScheduleHour(date.plusDays(i), time.plusMinutes(30 * j), true);
                currHour.setDoctor(doctor);

                doctorsMonthlyHours.add(currHour);
            }
        }
        doctor.setScheduleHours(doctorsMonthlyHours);

        return this.doctorsRepository.save(doctor);
    }

    @Override
    public List<ScheduleHour> getFreeScheduleHours(String username, LocalDateTime dateTime) {
        Doctor doctor = this.doctorsRepository.findByUsername(username);
        LocalDate date = dateTime.toLocalDate();

        return doctor.getScheduleHours()
                .stream()
                .filter(x -> x.getDate() == date && x.isFreeHour())
                .collect(Collectors.toList());
    }

    @Override
    public List<LocalTime> parseScheduleHoursToTimes(List<ScheduleHour> scheduleHours) {
        return scheduleHours
                .stream()
                .map(ScheduleHour::getTime)
                .collect(Collectors.toList());
    }

    @Override
    public List<LocalTime> handleFreeHoursRequest(String username, LocalDateTime dateTime) {
        return parseScheduleHoursToTimes(getFreeScheduleHours(username, dateTime));
    }


}
