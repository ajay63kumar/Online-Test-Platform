package com.onlinetest.OnlineTestPlatform.controller;

import com.onlinetest.OnlineTestPlatform.dtos.Response;
import com.onlinetest.OnlineTestPlatform.dtos.UserDTO;
import com.onlinetest.OnlineTestPlatform.enums.UserRole;
import com.onlinetest.OnlineTestPlatform.model.User;
import com.onlinetest.OnlineTestPlatform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor

public class UserController {
    @Autowired
    private UserService userService;

@GetMapping("/all")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Response> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


    @PreAuthorize("hasRole('ADMIN')") // only Admin can change roles
    @PutMapping("/{id}/role")
    public ResponseEntity<Response> updateUserRole(
            @PathVariable Long id,
            @RequestParam UserRole newRole) {
        return ResponseEntity.ok(userService.updateUserRole(id, newRole));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Response> loginUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @GetMapping("/testTakenByUser/{userId}")
    public ResponseEntity<Response> getUserAndTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserTakenTest(userId));
    }


    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentLoggedUser());
    }


}
