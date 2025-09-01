package com.onlinetest.OnlineTestPlatform.repository;

import com.onlinetest.OnlineTestPlatform.model.Test;
import com.onlinetest.OnlineTestPlatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {

    // Search by test title (case-insensitive)
    List<Test> findByTitleContainingIgnoreCase(String title);
}
