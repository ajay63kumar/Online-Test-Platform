package com.onlinetest.OnlineTestPlatform.repository;

import com.onlinetest.OnlineTestPlatform.enums.UserRole;
import com.onlinetest.OnlineTestPlatform.model.User;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // check if any user exists with given role
    List<User> findByRole(UserRole role);


    boolean existsByEmail(@NotBlank(message = "Email is required") String email);
    Optional<User> findByNameOrEmail(String name, String email);

}
