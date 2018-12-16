package com.baeldung.repository;

import com.baeldung.model.User;
import com.baeldung.model.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}