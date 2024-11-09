import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private questions = [
    { text: 'How often do you find it difficult to relax during stressful situations?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How frequently do you feel overwhelmed by feelings of hopelessness or despair?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How often do you struggle to maintain personal relationships?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How frequently do you neglect self-care in your daily routine?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How often do you feel out of control of your emotions during challenging circumstances?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How frequently do you feel unaccomplished or dissatisfied with your daily activities?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How often do you find it hard to concentrate or stay focused on tasks?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How frequently do you feel unsupported by your friends or family members?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How often do you find it difficult to set healthy boundaries in your relationships?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
    { text: 'How frequently do you feel a lack of purpose or direction in your life?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'], answer: '' },
  ];

  constructor() {}

  getQuestions(): Observable<any[]> {
    return of(this.questions);
  }
}
