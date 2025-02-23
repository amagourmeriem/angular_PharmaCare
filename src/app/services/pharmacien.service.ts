import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PharmacienService {
  private apiUrl = 'http://localhost:8081/api/pharmacien'; // URL du backend

  constructor(private http: HttpClient) {}

  // ✅ Récupérer le token d'authentification depuis le localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // ✅ Récupérer tous les médicaments
  getMedicaments(): Observable<any[]> {
    const jwt = this.getAuthToken();
    
    let headers = new HttpHeaders();
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }

    return this.http.get<any[]>(`${this.apiUrl}/medicament`, { headers });
  }

  // ✅ Créer un patient
  createPatient(patientData: any): Observable<any> {
    const jwt = this.getAuthToken();
    
    let headers = new HttpHeaders();
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }

    return this.http.post(`${this.apiUrl}/patient`, patientData, { headers });
  }
  // ✅ Récupérer toutes les ordonnances
  getOrdonnances(): Observable<any[]> {
    const jwt = this.getAuthToken();
    
    let headers = new HttpHeaders();
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }

    return this.http.get<any[]>(`${this.apiUrl}/ordonnance`, { headers });
  }

  // ✅ Créer une ordonnance
  createOrdonnance(ordonnanceData: any): Observable<any> {
    const jwt = this.getAuthToken();
    
    let headers = new HttpHeaders();
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }

    return this.http.post(`${this.apiUrl}/ordonnance`, ordonnanceData, { headers });
  }
}
