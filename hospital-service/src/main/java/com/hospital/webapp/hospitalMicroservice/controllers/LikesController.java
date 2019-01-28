package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.services.interfaces.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LikesController {

    private final LikeService likeService;

    @Autowired
    public LikesController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping("/likes/{doctorUsername}")
    public int getDoctorsTotalLikes(@PathVariable String doctorUsername) {
        return this.likeService.getDoctorTotalLikes(doctorUsername);
    }

    @PostMapping("/likes/{doctorUsername}")
    public int getPatientLikesForDoctor(@PathVariable String doctorUsername, @RequestBody String patientUsername) {
        return this.likeService.getPatientLikesForDoctor(doctorUsername, patientUsername);
    }

    @PostMapping("/likes/add/{doctorUsername}")
    public boolean hasAddedLikeForDoctor(@PathVariable String doctorUsername, @RequestBody String patientUsername) {
        return this.likeService.addLikeForDoctor(doctorUsername, patientUsername);
    }
}
