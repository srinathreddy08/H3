import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router: Router) {}

  url: string = "http://localhost:9999"

  getAuthHeader(): HttpHeaders{
    let token = localStorage.getItem("authToken") 
    let headers = new HttpHeaders();
    if (token) {
      // token = token.replace(/"/g, '');
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers
  }

  getUser(email: string): Observable<any>{
    return this.http.get(`${this.url}/service_provider?role=USER&email=${email}`,{headers : this.getAuthHeader()}) 
  }

  authenticate(email:string,password:string): Observable<any>{
    let cred = {
      "email" : email,
      "password" : password
    }
    return this.http.post(`${this.url}/auth/login`,cred)
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    
   
    // Navigate to login/first page
    this.router.navigate(['/first-page']);
  }



}