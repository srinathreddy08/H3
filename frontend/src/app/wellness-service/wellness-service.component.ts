import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ArticlesComponent } from '../articles/articles.component';
import { HelplinesComponent } from '../helplines/helplines.component';
import { SurveyComponent } from '../survey/survey.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-wellness-service',
  standalone: true,
  imports: [RouterLink, NavbarComponent, ArticlesComponent, HelplinesComponent, SurveyComponent,ChatbotComponent],
  templateUrl: './wellness-service.component.html',
  styleUrls: ['./wellness-service.component.css']
})
export class WellnessServiceComponent {
  
}