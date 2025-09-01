package com.onlinetest.OnlineTestPlatform.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmitTestRequest {
    private Integer score;

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
}

