package com.onlinetest.OnlineTestPlatform.controller;

import com.onlinetest.OnlineTestPlatform.dtos.QuestionDTO;
import com.onlinetest.OnlineTestPlatform.dtos.Response;
import com.onlinetest.OnlineTestPlatform.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/add")
    public ResponseEntity<Response> createQuestion(@Valid @RequestBody QuestionDTO questionDTO) {
        return ResponseEntity.ok(questionService.saveQuestion(questionDTO));
    }
//    @PostMapping("/pdf")
//    public ResponseEntity<List<QuestionDTO>> importQuestionsFromPdf(@RequestParam("file") MultipartFile file) throws IOException {
//        List<QuestionDTO> questions = questionService.importQuestionsFromPdf(file);
//        return ResponseEntity.ok(questions);
//    }

//    @PostMapping("/{testId}/upload-pdf")
//    public ResponseEntity<Response> uploadQuestionsFromPdf(
//            @PathVariable Long testId,
//            @RequestParam("file") MultipartFile file
//    ) throws IOException {
//        return ResponseEntity.ok(questionService.importQuestionsFromPdf( file));
//    }
// ✅ Import Questions from PDF
@PostMapping("/import-pdf")
public ResponseEntity<?> importQuestions(@RequestParam("file") MultipartFile file) throws IOException {
    return ResponseEntity.ok(questionService.importQuestionsFromPdf(file));
}
    
    @PutMapping("/{id}")
    public ResponseEntity<Response> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionDTO questionDTO
    ) {
        questionDTO.setId(id);
        return ResponseEntity.ok(questionService.updateQuestion(questionDTO));
    }


    @GetMapping("/all")
    public ResponseEntity<Response> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }



    @DeleteMapping("/delete/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.deleteQuestion(id));
    }
}
