package com.hospital.webapp.authservice.controllers;

import com.hospital.webapp.authservice.models.User;
import com.hospital.webapp.authservice.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/register/user")
    public User registerUser(@RequestBody User user) {
        this.userService.registerUser(user);
        return user;
    }
}
