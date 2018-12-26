package com.hospital.webapp.hospitalMicroservice.repositories;

import com.hospital.webapp.hospitalMicroservice.models.entity.ScheduleHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleHourRepository extends JpaRepository<ScheduleHour, Long> {
    List<ScheduleHour> findAllByPatientUsername(String patientUsername);
}
