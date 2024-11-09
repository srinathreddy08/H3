import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,NavbarComponent, RouterOutlet,LoginComponent,SignupComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: Event) => {
      this.checkRoute(event as NavigationEnd);
    });
    // this.router.url.forEach(()=>console.log('Hello'))
  }

  checkRoute(url: NavigationEnd) {
    const hideNavbarRoutes = ['/login', '/signup','/']; 
    this.showNavbar = !hideNavbarRoutes.some(route => url.url==route);
  }
}