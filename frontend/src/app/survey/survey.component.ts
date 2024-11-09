import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../survey.service'; 
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveyTitle: string = 'Depression Awareness Survey';
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  result: string = '';
  surveyCompleted: boolean = false; 

  optionPoints: { [key: string]: number } = {
    Never: 1,
    Rarely: 2,
    Sometimes: 3,
    Often: 4,
    Always: 5,
  };

  constructor(private surveyService: SurveyService) {} 

  ngOnInit() {
    this.resetSurvey(); 
  }

  resetSurvey() {
    this.surveyService.getQuestions().subscribe(questions => {
      this.questions = questions.map(q => ({ ...q, answer: '' })); 
      this.currentQuestionIndex = 0; 
      this.surveyCompleted = false; 
    });
  }

  nextQuestion() {
    if (this.canMoveToNext()) {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  isLastQuestion() {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  canMoveToNext() {
    return this.questions[this.currentQuestionIndex].answer !== '';
  }

  submitSurvey() {
    const totalScore = this.questions.reduce((acc, question) => {
      const answer = question.answer;
      return acc + this.optionPoints[answer]; 
    }, 0);

    this.result = this.getResultMessage(totalScore); 
    this.surveyCompleted = true; 
  }

  getResultMessage(score: number): string {
    if (score >= 40) {
      return "Remember, you are not alone, and there is always help available!";
    } else if (score >= 30) {
      return "You're going through a tough time, and it might help to talk to someone who can support you.";
    } else if (score >= 20) {
      return "You may be experiencing some sign of depression, you can always reach out for help and support.";
    } else if (score >= 11) {
      return "You're doing okay, but it’s always good to check in with yourself.";
    } else {
      return "You're positive and doing amazing in your life!";
    }
  }
}




