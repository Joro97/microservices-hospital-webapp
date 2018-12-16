package com.hospital.webapp.authservice.service.implementations;

import com.hospital.webapp.authservice.models.User;
import com.hospital.webapp.authservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository usersRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User applicationUser = usersRepository.findByUsername(username);

        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }

        return new org.springframework.security.core.userdetails.User(
          applicationUser.getUsername(),
          applicationUser.getPassword(),
          Collections.emptyList()
        );
    }
}
