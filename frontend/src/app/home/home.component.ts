import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit {
  sectionIndex: number = 0;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId); 
  }

  ngOnInit() {
    if (this.isBrowser) {
      
      const sections = document.querySelectorAll('.service-section');

      const setActiveSection = () => {
        sections.forEach((section, index) => {
          section.classList.remove('active');
          if (index === this.sectionIndex) {
            section.classList.add('active');
          }
        });

        
        this.sectionIndex = (this.sectionIndex + 1) % sections.length;
      };
     
      setActiveSection();

      setInterval(setActiveSection, 5000);
    }
  }
}
