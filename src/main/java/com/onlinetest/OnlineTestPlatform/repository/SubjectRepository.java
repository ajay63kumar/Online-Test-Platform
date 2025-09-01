package com.onlinetest.OnlineTestPlatform.repository;

import com.onlinetest.OnlineTestPlatform.model.Subject;
import com.onlinetest.OnlineTestPlatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
