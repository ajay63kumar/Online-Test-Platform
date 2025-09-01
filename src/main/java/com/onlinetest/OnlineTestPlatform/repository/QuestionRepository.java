package com.onlinetest.OnlineTestPlatform.repository;

import com.onlinetest.OnlineTestPlatform.model.Question;
import com.onlinetest.OnlineTestPlatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
