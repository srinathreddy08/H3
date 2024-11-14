import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy,OnInit {
  isProfileMenuOpen = false;
  private clickListener: any;
  passwordForm: FormGroup=new FormGroup({});
  isOpen = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';


  constructor(private fb: FormBuilder,
    private authService: AuthService) {
    // Add click listener to close dropdown when clicking outside
    this.clickListener = (event: MouseEvent) => {
      const dropdownElement = document.querySelector('.profile-dropdown');
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        this.closeProfileMenu();
      }
    };
    document.addEventListener('click', this.clickListener);
  }
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
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

  showError(field: string) {
    const control = this.passwordForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  openModal() {
    console.log("opening modal")
    this.isOpen = true;
    this.resetForm();
  }

  closeModal() {
    this.isOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.passwordForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.passwordForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { currentPassword, newPassword } = this.passwordForm.value;

    // this.authService.changePassword(currentPassword, newPassword)
    //   .subscribe({
    //     next: (response:any) => {
    //       console.log(response)
    //       this.successMessage = 'Password updated successfully!';
    //       this.isLoading = false;
    //       setTimeout(() => this.closeModal(), 2000);
    //     },
    //     error: (error:any) => {
    //       this.errorMessage = error.message || 'Failed to update password';
    //       this.isLoading = false;
    //     }
    //   });
  }
}