package com.hospital.webapp.hospitalMicroservice.models.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "doctors")
public class Doctor extends User {

    @Column
    private String specialty;

    @Column
    private int experience;

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }
}
