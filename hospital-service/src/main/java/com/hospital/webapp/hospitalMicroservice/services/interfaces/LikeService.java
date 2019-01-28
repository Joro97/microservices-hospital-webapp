package com.hospital.webapp.hospitalMicroservice.services.interfaces;

public interface LikeService {
    int getDoctorTotalLikes(String doctorUsername);
    int getPatientLikesForDoctor(String doctorUsername, String patientUsername);
    boolean addLikeForDoctor(String doctorUsername, String patientUsername);
}
