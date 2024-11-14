import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {
  isProfileMenuOpen = false;
  private clickListener: any;

  constructor(private authService: AuthService) {
    // Add click listener to close dropdown when clicking outside
    this.clickListener = (event: MouseEvent) => {
      const dropdownElement = document.querySelector('.profile-dropdown');
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        this.closeProfileMenu();
      }
    };
    document.addEventListener('click', this.clickListener);
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }

  // New logout method
  logout() {
    this.closeProfileMenu();
    this.authService.logout(); 
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }

  ngOnDestroy() {
    // Clean up click listener
    document.removeEventListener('click', this.clickListener);
  }
}