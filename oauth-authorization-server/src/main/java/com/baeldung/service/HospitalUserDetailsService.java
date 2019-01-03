package com.baeldung.service;

import com.baeldung.model.Authority;
import com.baeldung.model.User;
import com.baeldung.model.UserWrapper;
import com.baeldung.repository.AuthorityRepository;
import com.baeldung.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class HospitalUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public HospitalUserDetailsService(UserRepository userRepository, AuthorityRepository authorityRepository,
                                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = this.userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        return new UserWrapper(user);
    }

    public void registerUser(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        Set<Authority> userRoles = user.getAuthorities()
                                        .stream()
                                        .filter(a -> this.authorityRepository.findByRoleName(a.getAuthority()) != null)
                                        .map(a -> this.authorityRepository.findByRoleName(a.getAuthority()))
                                        .collect(Collectors.toSet());

        if (userRoles.size() != 0) {
            user.setAuthorities(userRoles);
        }
        this.userRepository.save(user);
    }
}