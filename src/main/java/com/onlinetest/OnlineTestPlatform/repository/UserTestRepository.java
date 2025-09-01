package com.onlinetest.OnlineTestPlatform.repository;

import com.onlinetest.OnlineTestPlatform.model.UserTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserTestRepository extends JpaRepository<UserTest, Long> {
    List<UserTest> findByTestIdOrderByScoreDesc(Long testId); // leaderboard
    List<UserTest> findByUserId(Long userId);
    boolean existsByUserIdAndTestId(Long userId, Long testId);

    List<UserTest> findByTest_TitleContainingIgnoreCaseOrderByScoreDesc(String testTitle);

}

