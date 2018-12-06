package com.hospital.webapp.hospitalMicroservice.models.view;

import com.hospital.webapp.hospitalMicroservice.models.entity.Doctor;

import java.util.Set;

public class PatientRegisterRequestModel {
    private String userName;
    private String password;
    private Set<Doctor> doctors;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(Set<Doctor> doctors) {
        this.doctors = doctors;
    }
}
