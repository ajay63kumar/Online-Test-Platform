package com.onlinetest.OnlineTestPlatform.controller;

import com.onlinetest.OnlineTestPlatform.dtos.LoginRequest;
import com.onlinetest.OnlineTestPlatform.dtos.RegisterRequest;
import com.onlinetest.OnlineTestPlatform.dtos.Response;
import com.onlinetest.OnlineTestPlatform.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
@Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        return ResponseEntity.ok(userService.registerUser(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody @Valid LoginRequest loginRequest) {

        return ResponseEntity.ok(userService.loginUser(loginRequest));

    }

}
