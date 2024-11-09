import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'] // Corrected to styleUrls
})
export class FirstPageComponent {
  showPopup = false; 

  constructor(private router: Router) {}

  togglePopup() {
    this.showPopup = !this.showPopup; 
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']); 
  }

  // Close popup if clicked outside (optional)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.showPopup && !target.closest('.popup') && !target.closest('.get-started-button')) {
      this.showPopup = false;
    }
  }
}
