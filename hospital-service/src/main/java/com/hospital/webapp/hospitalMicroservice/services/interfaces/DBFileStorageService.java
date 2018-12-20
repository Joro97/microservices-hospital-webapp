package com.hospital.webapp.hospitalMicroservice.services.interfaces;

import com.hospital.webapp.hospitalMicroservice.models.entity.DBFile;
import org.springframework.web.multipart.MultipartFile;

public interface DBFileStorageService {
    DBFile storeFile(MultipartFile file);
    DBFile getFile(long id);
}
