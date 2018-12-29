package com.hospital.webapp.hospitalMicroservice.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    @Size(min = 3, max = 33, message = "Doctor's username should be between 3 and 33 characters long and unique")
    private String username;

    @Column
    private String specialty;

    @Column
    @PositiveOrZero
    private int experience;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private DBFile avatar;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "doctor")
    Set<ScheduleHour> scheduleHours;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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

    public DBFile getAvatar() {
        return avatar;
    }

    public void setAvatar(DBFile avatar) {
        this.avatar = avatar;
    }

    public Set<ScheduleHour> getScheduleHours() {
        return scheduleHours;
    }

    public void setScheduleHours(Set<ScheduleHour> scheduleHours) {
        this.scheduleHours = scheduleHours;
    }
}
