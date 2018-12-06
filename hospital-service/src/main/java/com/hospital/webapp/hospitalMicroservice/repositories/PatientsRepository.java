package com.hospital.webapp.hospitalMicroservice.repositories;

import com.hospital.webapp.hospitalMicroservice.models.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientsRepository extends JpaRepository<Patient, Long> {
}
