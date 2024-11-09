package com.project.claude_demo.service;

import com.project.claude_demo.model.Article;
import com.project.claude_demo.model.Helpline;
import com.project.claude_demo.model.Survey;
import com.project.claude_demo.repository.ArticleRepository;
import com.project.claude_demo.repository.HelplineRepository;
import com.project.claude_demo.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WellnessService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private HelplineRepository helplineRepository;

    @Autowired
    private SurveyRepository surveyRepository;

//    public List<Article> getArticles(String category) {
//        if (category != null && !category.isEmpty()) {
//            return articleRepository.findByCategory(category);
//        }
//        return articleRepository.findAll();
//    }

    public List<Helpline> getHelplines() {
        return helplineRepository.findAll();
    }

    public String evaluateSurvey(Survey survey) {
        List<String> answers = survey.getAnswers();
        int score = 0;

        // Assuming the survey has 10 questions with answers ranging from 1 to 5
        // 1: Strongly Disagree, 2: Disagree, 3: Neutral, 4: Agree, 5: Strongly Agree
        for (String answer : answers) {
            score += Integer.parseInt(answer);
        }

        String result;
        if (score <= 20) {
            result = "Based on your answers, your stress levels seem to be low. Keep up the good work! We recommend continuing your current wellness practices.";
        } else if (score <= 30) {
            result = "Your responses indicate moderate stress levels. We recommend incorporating more relaxation techniques into your daily routine, such as deep breathing exercises or meditation.";
        } else if (score <= 40) {
            result = "Your survey results suggest higher than average stress levels. We strongly recommend speaking with a mental health professional and considering stress management workshops.";
        } else {
            result = "Your answers indicate very high stress levels. We urge you to consult with a mental health professional as soon as possible. In the meantime, try to reduce your workload and practice self-care activities.";
        }

        survey.setResult(result);
        surveyRepository.save(survey);
        return result;
    }
}