
package com.onlinetest.OnlineTestPlatform.controller;

import com.onlinetest.OnlineTestPlatform.dtos.Response;
import com.onlinetest.OnlineTestPlatform.dtos.TestDTO;
import com.onlinetest.OnlineTestPlatform.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
public class TestController {

    @Autowired
    private TestService testService;





    // ✅ Add new test
    @PostMapping("/add")
    public ResponseEntity<Response> saveTest(@RequestBody TestDTO testDTO) {
        return ResponseEntity.ok(testService.saveTest(testDTO));
    }

    // ✅ Update existing test
    @PutMapping("/{id}")
    public ResponseEntity<Response> updateTest(
            @PathVariable Long id,
            @RequestBody TestDTO testDTO
    ) {
        testDTO.setId(id);
        return ResponseEntity.ok(testService.updateTest(testDTO));
    }

    // ✅ Get all tests
    @GetMapping("/all")
    public ResponseEntity<Response> getAllTests() {
        return ResponseEntity.ok(testService.getAllTests());
    }

    // ✅ Get test by ID
    @GetMapping("/{id}")
    public ResponseEntity<Response> getTestById(@PathVariable Long id) {
        return ResponseEntity.ok(testService.getTestById(id));
    }

    // ✅ Delete test
    @DeleteMapping("/{id}")
    public ResponseEntity<Response> deleteTest(@PathVariable Long id) {
        return ResponseEntity.ok(testService.deleteTest(id));
    }

    // ✅ Search test by title (case-insensitive)
    @GetMapping("/search")
    public ResponseEntity<Response> searchTests(@RequestParam("q") String query) {
        return ResponseEntity.ok(testService.searchTest(query));
    }
}

