import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { Router } from '@angular/router';  // Importer le Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth';  // URL de votre backend

  constructor(private http: HttpClient, private router: Router) {}  // Injection du Router

  login(emailOrCode: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { 
      emailOrCode: emailOrCode, 
      password: password 
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Retourne vrai si un token existe
  }
  
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken'); // Supprime le token lors du logout
  }
}
