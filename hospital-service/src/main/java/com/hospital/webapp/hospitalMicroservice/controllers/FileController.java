package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.models.entity.DBFile;
import com.hospital.webapp.hospitalMicroservice.models.entity.UploadFileResponse;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.DBFileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class FileController {
    private final DBFileStorageService dbFileStorageService;

    @Autowired
    public FileController(DBFileStorageService dbFileStorageService) {
        this.dbFileStorageService = dbFileStorageService;
    }

    @PostMapping("/api/upload/image")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        DBFile dbFile = this.dbFileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(dbFile.getId() + "")
                .toUriString();

        return new UploadFileResponse(dbFile.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());
    }

    @GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable long fileId) {
        DBFile dbFile = this.dbFileStorageService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }
}
