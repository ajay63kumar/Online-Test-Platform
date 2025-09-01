package com.onlinetest.OnlineTestPlatform.controller;

import com.onlinetest.OnlineTestPlatform.dtos.Response;
import com.onlinetest.OnlineTestPlatform.dtos.SubmitTestRequest;
import com.onlinetest.OnlineTestPlatform.model.User;
import com.onlinetest.OnlineTestPlatform.model.UserTest;
import com.onlinetest.OnlineTestPlatform.security.AuthUser;
import com.onlinetest.OnlineTestPlatform.service.TestAttemptService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testAttempt")
@RequiredArgsConstructor
public class TestAttemptController {

    private final TestAttemptService testAttemptService;


    @PostMapping("/submit/{testId}")
    public Response submitTest(@PathVariable Long testId, @RequestBody SubmitTestRequest request) {
        User currentUser = getCurrentUser();
        testAttemptService.submitTest(currentUser.getId(), testId, request.getScore());
        return Response.builder()
                .status(200)
                .message("Test submitted successfully")
                .build();
    }

//    @PostMapping("/submit/{testId}")
//    public Response submitTest(@PathVariable Long testId, @RequestParam Integer score) {
//        User currentUser = getCurrentUser(); // get logged-in user
//        testAttemptService.submitTest(currentUser.getId(), testId, score);
//        return Response.builder()
//                .status(200)
//                .message("Test submitted successfully")
//                .build();
//    }

    @GetMapping("/leaderboard/search")
    public Response searchLeaderboard(@RequestParam String testName) {
        return testAttemptService.searchLeaderboard(testName);
    }

    @GetMapping("/performance")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Response getUserPerformance(@RequestParam String username) {
        return testAttemptService.getUserPerformance(username);
    }

    @GetMapping("/attempted")
    public Response userAttemptedTests() {
        User currentUser = getCurrentUser();
        return testAttemptService.getUserAttemptedTests(currentUser.getId());
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ((AuthUser) auth.getPrincipal()).getUser();
    }
}
