package com.hospital.webapp.hospitalMicroservice.models.entity;

import javax.persistence.*;

@Entity
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(name = "doctor_username")
    private String doctorUsername;

    @Column(name = "patient_username")
    private String patientUsername;

    public Like() {

    }

    public Like(String doctorUsername, String patientUsername) {
        this.doctorUsername = doctorUsername;
        this.patientUsername = patientUsername;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getDoctorUsername() {
        return doctorUsername;
    }

    public void setDoctorUsername(String doctorUsername) {
        this.doctorUsername = doctorUsername;
    }

    public String getPatientUsername() {
        return patientUsername;
    }

    public void setPatientUsername(String patientUsername) {
        this.patientUsername = patientUsername;
    }
}
