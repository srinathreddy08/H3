import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private questions = [
    {
      text: 'How are you feeling emotionally right now?',
      options: [
        'I feel calm and content',
        'I feel slightly unsettled',
        'I feel moderately distressed',
        'I feel severely overwhelmed'
      ],
      answer: ''
    },
    {
      text: 'Are you experiencing physical signs of stress at the moment (e.g., rapid heartbeat, tension, sweating)?',
      options: [
        'No physical symptoms',
        'Mild physical symptoms',
        'Moderate physical symptoms',
        'Severe physical symptoms'
      ],
      answer: ''
    },
    {
      text: 'How well can you concentrate on tasks right now?',
      options: [
        'I can focus clearly',
        'I\'m slightly distracted',
        'I\'m having trouble concentrating',
        'I can barely focus at all'
      ],
      answer: ''
    },
    {
      text: 'How would you describe your energy level at this moment?',
      options: [
        'Energetic and motivated',
        'Slightly tired but managing',
        'Notably fatigued',
        'Completely exhausted'
      ],
      answer: ''
    },
    {
      text: 'How are your thoughts flowing right now?',
      options: [
        'Clear and organized',
        'Slightly scattered',
        'Racing or disorganized',
        'Overwhelming or chaotic'
      ],
      answer: ''
    },
    {
      text: 'How connected do you feel to your surroundings and people around you right now?',
      options: [
        'Fully present and connected',
        'Slightly disconnected',
        'Notably detached',
        'Completely isolated'
      ],
      answer: ''
    },
    {
      text: 'How would you rate your current ability to handle daily challenges?',
      options: [
        'Confident in handling challenges',
        'Slightly overwhelmed',
        'Struggling to cope',
        'Unable to handle challenges'
      ],
      answer: ''
    },
    {
      text: 'How would you describe your current emotional control?',
      options: [
        'In control of my emotions',
        'Slightly unstable',
        'Difficulty managing emotions',
        'Feeling out of control'
      ],
      answer: ''
    },
    {
      text: 'How safe and secure do you feel right now?',
      options: [
        'Completely safe and secure',
        'Slightly uneasy',
        'Notably anxious',
        'Extremely unsafe'
      ],
      answer: ''
    },
    {
      text: 'How hopeful do you feel about your immediate future?',
      options: [
        'Optimistic and hopeful',
        'Slightly uncertain',
        'Notably worried',
        'Feeling hopeless'
      ],
      answer: ''
    }
  ];

  getQuestions(): Observable<any[]> {
    return of(this.questions);
  }
}