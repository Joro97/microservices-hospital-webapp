package com.hospital.webapp.hospitalMicroservice.repositories;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorsRepository extends JpaRepository<Doctor, Long> {

}
