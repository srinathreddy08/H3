package com.project.claude_demo.controller;

import com.project.claude_demo.model.Article;
import com.project.claude_demo.model.Helpline;
import com.project.claude_demo.model.Survey;
import com.project.claude_demo.service.WellnessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wellness")
public class WellnessController {
    @Autowired
    private WellnessService wellnessService;

//    @GetMapping("/articles")
//    public ResponseEntity<List<Article>> getArticles(@RequestParam(required = false) String category) {
//        return ResponseEntity.ok(wellnessService.getArticles(category));
//    }

    @GetMapping("/helplines")
    public ResponseEntity<List<Helpline>> getHelplines() {
        return ResponseEntity.ok(wellnessService.getHelplines());
    }

    @PostMapping("/survey")
    public ResponseEntity<String> submitSurvey(@RequestBody Survey survey) {
        return ResponseEntity.ok(wellnessService.evaluateSurvey(survey));
    }
    
}