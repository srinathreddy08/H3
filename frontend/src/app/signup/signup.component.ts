import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signInForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      role: ['USER', [Validators.required]]
    });
  }

  onSubmit() {
    console.log("yo");
    
    if (this.signInForm.valid) {
      const formData = this.signInForm.value;
      console.log(this.signInForm.value);
      
      this.http.post('http://localhost:9999/auth/signup', formData)
        .subscribe({
          next: (response) => console.log('User registered successfully', response),
          error: (error) => console.error('Error occurred while registering user', error)
        });
        alert("registered succesfull!! you can login now.")
        
    } else {
      console.log('Form is invalid');
    }
  }
}