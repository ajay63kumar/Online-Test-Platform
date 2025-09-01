package com.onlinetest.OnlineTestPlatform.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.onlinetest.OnlineTestPlatform.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int status;
    private String message;

    private String token;
    private UserRole role;
    private String expirationTime;

    private Integer totalPages;
    private Long totalElements;

    private UserDTO user;
    private List<UserDTO> users;

    private QuestionDTO question;
    private List<QuestionDTO> questions;

    private TestDTO test;
    private List<TestDTO> tests;

    private SubjectDTO subject;
    private List<SubjectDTO> subjects;

    private List<UserTestDTO> userTests;  // for leaderboard & user attempted tests

    // 🔹 New fields for performance API
    private Integer totalTests;
    private Double avgScore;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}