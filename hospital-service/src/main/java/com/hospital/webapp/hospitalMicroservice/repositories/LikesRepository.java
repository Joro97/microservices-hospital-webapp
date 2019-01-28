package com.hospital.webapp.hospitalMicroservice.repositories;

import com.hospital.webapp.hospitalMicroservice.models.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikesRepository extends JpaRepository<Like, Long> {
    List<Like> findAllByDoctorUsername(String doctorUsername);
    List<Like> findAllByDoctorUsernameAndPatientUsername(String doctorUsername, String patientUsername);
}
