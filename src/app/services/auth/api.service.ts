// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/secured-endpoint'; // Endpoint sécurisé

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir des données sécurisées
  getData(): Observable<any> {
    const token = localStorage.getItem('authToken');  // Récupérer le token du localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Ajouter le token dans les headers

    return this.http.get<any>(this.apiUrl, { headers });  // Faire la requête avec le token
  }
}
