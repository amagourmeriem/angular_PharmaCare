import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  nom: string;
  prenom: string;
  telephone: string;
  codePatient: string;
  cin: string;
}

@Injectable({
  providedIn: 'root', // Cela rend le service disponible globalement
})
export class PatientService {
  private baseUrl = 'http://localhost:8081/api/pharmacien'; // URL de votre backend

  constructor(private http: HttpClient) {}

  
  getPatients(): Observable<Patient[]> {
    const authToken = localStorage.getItem('authToken');
    console.log('Token utilisé :', authToken); // Vérifiez ici
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json"
    });
    return this.http.get<Patient[]>(`${this.baseUrl}/patients`, { headers });
  }
  
  
}
