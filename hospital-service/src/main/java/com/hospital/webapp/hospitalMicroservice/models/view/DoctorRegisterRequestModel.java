package com.hospital.webapp.hospitalMicroservice.models.view;

import com.hospital.webapp.hospitalMicroservice.models.entity.Patient;

import java.util.Set;

public class DoctorRegisterRequestModel {
    private String userName;
    private String password;
    private long doctorId;
    //private Set<Patient> patients;

    public String getuserName() {
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

/*    public Set<Patient> getPatients() {
        return patients;
    }

    public void setPatients(Set<Patient> patients) {
        this.patients = patients;
    }*/

    public long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(long doctorId) {
        this.doctorId = doctorId;
    }
}
