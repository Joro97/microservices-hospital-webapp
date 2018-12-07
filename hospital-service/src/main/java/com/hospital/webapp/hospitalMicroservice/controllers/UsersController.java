package com.hospital.webapp.hospitalMicroservice.controllers;

import com.hospital.webapp.hospitalMicroservice.models.entity.User;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/api/register")
    public User registerUser(@RequestBody User user) {
        return this.usersService.registerUser(user);
    }

    @PostMapping("/api/login")
    public boolean login(@RequestBody User user) {
        return true;
    }
}
