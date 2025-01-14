import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PharmacienService {
  private apiUrl = 'http://localhost:8081/api/pharmacien'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupérer le token d'authentification depuis le localStorage (ou autre méthode)
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken'); // Assurez-vous que le token est stocké sous cette clé
  }

  createPatient(patientData: any): Observable<any> {
    const jwt = this.getAuthToken();

    // Si le token est présent, l'ajouter dans les en-têtes
    let headers = new HttpHeaders();
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }

    // Envoyer la requête POST avec les en-têtes contenant le token
    return this.http.post(`${this.apiUrl}/patient`, patientData, { headers });
  }
}
