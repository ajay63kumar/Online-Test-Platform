package com.onlinetest.OnlineTestPlatform.dtos;


import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {
    private Long id;
    private String question;
    private List<String> options;
    private String correctAnswer;
}

