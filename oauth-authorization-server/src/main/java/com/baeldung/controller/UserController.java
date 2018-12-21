package com.baeldung.controller;

import com.baeldung.model.User;
import com.baeldung.service.HospitalUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final HospitalUserDetailsService userService;

    @Autowired
    public UserController(HospitalUserDetailsService userService) {
        this.userService = userService;
    }

    @PostMapping("/register/user")
    public void registerUser(@RequestBody User user) {
        this.userService.registerUser(user);
    }
}
