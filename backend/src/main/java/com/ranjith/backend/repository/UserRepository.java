package com.ranjith.backend.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ranjith.backend.entity.User;
public interface UserRepository extends JpaRepository<User,Long>{

	Optional<User> findByEmail(String email);
}
