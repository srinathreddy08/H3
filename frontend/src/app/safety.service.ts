import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SafetyService {
  private apiUrl = 'http://localhost:8090/api/emergency-contacts';

  constructor(private http: HttpClient) {}

  // Method to send a danger message to all contacts
  alertAllContacts(message: string): Observable<any> {
    const url = `${this.apiUrl}/alert`;
    const payload = {
      message: message
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(url, payload, { headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}