import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ArticlesComponent } from '../articles/articles.component';
import { HelplinesComponent } from '../helplines/helplines.component';
import { SurveyComponent } from '../survey/survey.component';

@Component({
  selector: 'app-wellness-service',
  standalone: true,
  imports: [RouterLink, NavbarComponent, ArticlesComponent, HelplinesComponent, SurveyComponent],
  templateUrl: './wellness-service.component.html',
  styleUrls: ['./wellness-service.component.css']
})
export class WellnessServiceComponent {
  showChatbot = false;
  chatbotMessages: { text: string; isUser: boolean }[] = [];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  toggleChatbot(): void {
    this.showChatbot = !this.showChatbot;
    if (this.showChatbot) {
      this.chatbotMessages = [
        { text: 'Hello! I\'m your friendly Wellness Hub chatbot. How can I assist you today?', isUser: false }
      ];
    } else {
      this.chatbotMessages = [];
    }
  }

  sendMessage(event: any): void {
    if (event.type === 'keyup' && event.key !== 'Enter') return;

    const userMessage = event.target.value.trim();
    if (userMessage) {
      this.chatbotMessages.push({ text: userMessage, isUser: true });
      event.target.value = '';

      // Simulate a response from the chatbot
      setTimeout(() => {
        this.chatbotMessages.push({ text: 'I\'m sorry, I don\'t have a specific answer for that. How else can I help you today?', isUser: false });
      }, 1000);
    }
  }
}