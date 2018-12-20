package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.DBFile;
import com.hospital.webapp.hospitalMicroservice.repositories.DBFileRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DBFileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DBFileStorageServiceImpl implements DBFileStorageService {
    private final DBFileRepository dbFileRepository;

    @Autowired
    public DBFileStorageServiceImpl(DBFileRepository dbFileRepository) {
        this.dbFileRepository = dbFileRepository;
    }

    @Override
    public DBFile storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());

            return this.dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            System.out.println(ex);
        }

        return null;
    }

    @Override
    public DBFile getFile(long id) {
        return this.dbFileRepository.findById(id);
    }
}
