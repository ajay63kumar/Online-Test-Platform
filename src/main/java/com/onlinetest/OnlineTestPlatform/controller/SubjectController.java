package com.onlinetest.OnlineTestPlatform.controller;


import com.onlinetest.OnlineTestPlatform.dtos.Response;
import com.onlinetest.OnlineTestPlatform.dtos.SubjectDTO;

import com.onlinetest.OnlineTestPlatform.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor

public class SubjectController {


    @Autowired
    private SubjectService subjectService;

    @PostMapping("/add")
    public ResponseEntity<Response> saveSubject(@RequestBody SubjectDTO subjectDTO) {
        return ResponseEntity.ok(subjectService.saveSubject(subjectDTO));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Response> updateSubject(
            @PathVariable Long id,
            @RequestBody SubjectDTO subjectDTO
    ) {
        subjectDTO.setId(id);
        return ResponseEntity.ok(subjectService.updateSubject(subjectDTO));
    }


    @GetMapping("/all")
    public ResponseEntity<Response> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getSubjectById(@PathVariable Long id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));

    }

}