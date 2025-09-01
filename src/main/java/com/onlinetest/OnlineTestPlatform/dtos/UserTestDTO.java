package com.onlinetest.OnlineTestPlatform.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserTestDTO {
    private Long userId;
    private String userName;
    private String userEmail;

    private Long testId;
    private String testTitle;

    private Integer score;
    private LocalDateTime attemptedAt;
}
