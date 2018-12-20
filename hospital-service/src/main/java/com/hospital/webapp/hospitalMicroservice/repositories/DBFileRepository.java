package com.hospital.webapp.hospitalMicroservice.repositories;

import com.hospital.webapp.hospitalMicroservice.models.entity.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, Long> {
    DBFile findById(long id);
}
