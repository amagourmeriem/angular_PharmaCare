import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from './auth-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth'; // URL de votre backend

  // BehaviorSubject pour suivre l'état de l'authentification
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Effectue la connexion de l'utilisateur.
   * @param emailOrCode - Email ou code de l'utilisateur.
   * @param password - Mot de passe de l'utilisateur.
   * @returns Observable d'AuthResponse.
   */
  login(emailOrCode: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { emailOrCode, password }).pipe(
      // Use `tap` to process the response before it is returned to subscribers
      tap((response: AuthResponse) => {
        if (response && response.jwt) {
          this.saveToken(response.jwt); // Pass the token to `saveToken`
        } else {
          console.error('Token is missing in the response:', response);
        }
      }),
      catchError((error) => {
        console.error('Erreur de connexion:', error);
        return throwError(error);
      })
    );
  }
  

  /**
   * Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un token valide.
   * @returns boolean - Vrai si un token existe, sinon faux.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('Token vérifié dans isAuthenticated:', token);
    return !!token;
  }

  /**
   * Sauvegarde le token d'authentification dans le localStorage.
   * @param token - Token JWT reçu depuis le backend.
   */
  saveToken(jwt: string): void {
    if (!jwt) {
      console.error('Aucun token à enregistrer.');
      return;
    }
    console.log('Token enregistré:', jwt);
    localStorage.setItem('authToken', jwt);
    // Mise à jour du status d'authentification
    this.authSubject.next(true);
  }

  /**
   * Récupère le token d'authentification depuis le localStorage.
   * @returns string | null - Token JWT ou null si inexistant.
   */
  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('Token récupéré:', token);
    return token;
  }

  /**
   * Supprime le token d'authentification du localStorage.
   */
  removeToken(): void {
    console.log('Token supprimé.');
    localStorage.removeItem('authToken');
    // Mise à jour du status d'authentification
    this.authSubject.next(false);
  }

  /**
   * Déconnecte l'utilisateur et le redirige vers la page de connexion.
   */
  logout(): void {
    this.removeToken(); // Supprime le token
    console.log('Déconnexion réussie. Redirection vers la page de connexion.');
    this.router.navigate(['/authentication/login']);
  }

  /**
   * Ajoute un en-tête d'autorisation avec le token.
   * @returns HttpHeaders - En-tête avec le token JWT.
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      console.error('Aucun token trouvé. L\'utilisateur n\'est pas authentifié.');
      throw new Error('Utilisateur non authentifié');
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
