package com.onlinetest.OnlineTestPlatform.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestDTO {
    private Long id;
    private String name;
    private SubjectDTO subject;
    private List<QuestionDTO> questions;
    private Integer score;
    private LocalDateTime attemptedAt;
    // User-configurable
    private Integer durationMin;     // e.g. 15, 30, 60
    private Integer totalQuestions;  // e.g. 10, 20, 50

    // Admin-controlled only
    private String status; // e.g. ACTIVE, INACTIVE
}
