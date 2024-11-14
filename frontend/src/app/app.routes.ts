import { Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { WellnessServiceComponent } from './wellness-service/wellness-service.component';
import { SafetyServiceComponent } from './safety-service/safety-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ArticlesComponent } from './articles/articles.component';
import { HelplineService } from './helplines.service';
import { HelplinesComponent } from './helplines/helplines.component';
import { SurveyComponent } from './survey/survey.component';

export const routes: Routes = [
    { path: '', redirectTo: 'first-page', pathMatch: 'full' },
    { path: 'first-page', component: FirstPageComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'wellness', component: WellnessServiceComponent },
    { path: 'safety', component: SafetyServiceComponent }, 
    { path: 'articles', component: ArticlesComponent},
    { path: 'helplines', component: HelplinesComponent},
    { path: 'survey', component: SurveyComponent},
    { path: 'aboutus', component: AboutUsComponent },
   
    // { path: '**', redirectTo: '' }  
];
