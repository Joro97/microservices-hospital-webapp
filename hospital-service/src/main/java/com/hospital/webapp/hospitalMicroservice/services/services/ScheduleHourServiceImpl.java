package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;
import com.hospital.webapp.hospitalMicroservice.repositories.ScheduleHourRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.ScheduleHourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleHourServiceImpl implements ScheduleHourService {
    private final ScheduleHourRepository scheduleHourRepository;

    @Autowired
    public ScheduleHourServiceImpl(ScheduleHourRepository scheduleHourRepository) {
        this.scheduleHourRepository = scheduleHourRepository;
    }

    @Override
    public List<ScheduleHour> getPatientsAppointments(String patientUsername) {
        return this.scheduleHourRepository.findAllByPatientUsername(patientUsername);
    }
}
