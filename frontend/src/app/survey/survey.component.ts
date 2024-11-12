import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../survey.service';
import { NavbarComponent } from '../navbar/navbar.component';

interface SurveyResult {
  stressLevel: string;
  message: string;
  immediateActions: string[];
  recommendations: string[];
  resources: string[];
}

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveyTitle: string = 'Current Mental State Assessment';
  surveyDescription: string = 'This assessment helps understand how you\'re feeling right now. Be honest with yourself - your answers will help us provide the most relevant support.';
  currentQuestionIndex: number = 0;
  surveyCompleted: boolean = false;
  questions: any[] = [];
  result: SurveyResult | null = null;

  constructor(private surveyService: SurveyService) {}

 

  calculateScore(): number {
    const scoreMap: { [key: string]: number } = {
      'I feel calm and content': 0,
      'Completely safe and secure': 0,
      'Energetic and motivated': 0,
      'Clear and organized': 0,
      'Fully present and connected': 0,
      'Confident in handling challenges': 0,
      'In control of my emotions': 0,
      'Optimistic and hopeful': 0,
      'I can focus clearly': 0,
      'No physical symptoms': 0,
      
      'I feel slightly unsettled': 1,
      'Slightly uneasy': 1,
      'Slightly tired but managing': 1,
      'Slightly scattered': 1,
      'Slightly disconnected': 1,
      'Slightly overwhelmed': 1,
      'Slightly unstable': 1,
      'Slightly uncertain': 1,
      'I\'m slightly distracted': 1,
      'Mild physical symptoms': 1,
      
      'I feel moderately distressed': 2,
      'Notably anxious': 2,
      'Notably fatigued': 2,
      'Racing or disorganized': 2,
      'Notably detached': 2,
      'Struggling to cope': 2,
      'Difficulty managing emotions': 2,
      'Notably worried': 2,
      'I\'m having trouble concentrating': 2,
      'Moderate physical symptoms': 2,
      
      'I feel severely overwhelmed': 3,
      'Extremely unsafe': 3,
      'Completely exhausted': 3,
      'Overwhelming or chaotic': 3,
      'Completely isolated': 3,
      'Unable to handle challenges': 3,
      'Feeling out of control': 3,
      'Feeling hopeless': 3,
      'I can barely focus at all': 3,
      'Severe physical symptoms': 3
    };

    return this.questions.reduce((acc, question) => {
      return acc + (scoreMap[question.answer] || 0);
    }, 0);
  }

  getResult(score: number): SurveyResult {
    const maxScore = this.questions.length * 3; // Maximum possible score
    const percentage = (score / maxScore) * 100;

    if (percentage <= 25) {
      return {
        stressLevel: 'Minimal Stress',
        message: 'You appear to be in a stable and balanced state of mind. This is a great time to focus on maintaining your well-being.',
        immediateActions: [
          'Take a moment to appreciate your current positive state',
          'Consider journaling about what\'s working well for you',
          'Share your positive energy with others who might need support'
        ],
        recommendations: [
          'Continue your current positive practices',
          'Set new personal growth goals',
          'Strengthen your support networks'
        ],
        resources: [
          'Mindfulness and meditation apps',
          'Personal development resources',
          'Wellness tracking tools'
        ]
      };
    } else if (percentage <= 50) {
      return {
        stressLevel: 'Moderate Stress',
        message: 'You\'re experiencing some stress, but it\'s still manageable. Taking action now can help prevent it from escalating.',
        immediateActions: [
          'Take 5 deep breaths right now',
          'Step away from stressful situations for a short break',
          'Reach out to a friend or family member'
        ],
        recommendations: [
          'Practice regular stress-management techniques',
          'Establish better boundaries in stressful situations',
          'Create a daily relaxation routine'
        ],
        resources: [
          'Stress management guides',
          'Relaxation techniques',
          'Support group connections'
        ]
      };
    } else if (percentage <= 75) {
      return {
        stressLevel: 'High Stress',
        message: 'You\'re dealing with significant stress right now. It\'s important to take immediate steps to care for yourself.',
        immediateActions: [
          'Find a quiet space to decompress',
          'Call a trusted friend or family member',
          'Use grounding techniques (5-4-3-2-1 method)'
        ],
        recommendations: [
          'Schedule an appointment with a counselor',
          'Reduce commitments where possible',
          'Create a stress management plan'
        ],
        resources: [
          'Professional counseling services',
          'Crisis helpline numbers',
          'Online therapy platforms'
        ]
      };
    } else {
      return {
        stressLevel: 'Severe Stress',
        message: 'You\'re experiencing severe stress levels. Please reach out for professional help - you don\'t have to handle this alone.',
        immediateActions: [
          'Contact a mental health professional immediately',
          'Reach out to your support system right now',
          'Remove yourself from stressful environments if possible'
        ],
        recommendations: [
          'Seek immediate professional support',
          'Consider taking a break from regular duties',
          'Create a crisis management plan with a professional'
        ],
        resources: [
          'Emergency mental health services',
          '24/7 Crisis hotlines',
          'Local mental health clinics'
        ]
      };
    }
  }

  
  
 ngOnInit() {
  this.resetSurvey();
}

resetSurvey() {
  this.surveyService.getQuestions().subscribe(questions => {
    this.questions = questions.map(q => ({ ...q, answer: '' }));
    this.currentQuestionIndex = 0;
    this.surveyCompleted = false;
    this.result = null;
  });
}

getProgressPercentage(): number {
  const answeredQuestions = this.questions.filter(q => q.answer !== '').length;
  return (answeredQuestions / this.questions.length) * 100;
}

selectOption(option: string) {
  this.questions[this.currentQuestionIndex].answer = option;
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

isLastQuestion(): boolean {
  return this.currentQuestionIndex === this.questions.length - 1;
}

canMoveToNext(): boolean {
  return this.questions[this.currentQuestionIndex].answer !== '';
}







submitSurvey() {
  const score = this.calculateScore();
  this.result = this.getResult(score);
  this.surveyCompleted = true;
}

}