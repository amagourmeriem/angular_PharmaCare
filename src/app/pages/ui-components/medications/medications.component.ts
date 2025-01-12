import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitle],
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationComponent implements OnInit {

  // Liste des colonnes affichées dans le tableau
  displayedColumns: string[] = ['nomMedicament', 'posologie', 'frequence', 'remarques'];

  // Données fictives pour les médicaments
  medications = [
    {
      nom: 'Paracétamol',
      posologie: '500 mg',
      frequence: '3 fois par jour',
      remarques: 'À prendre après les repas'
    },
    {
      nom: 'Ibuprofène',
      posologie: '400 mg',
      frequence: '2 fois par jour',
      remarques: 'Ne pas dépasser 10 jours de traitement'
    },
    {
      nom: 'Amoxicilline',
      posologie: '250 mg',
      frequence: '3 fois par jour',
      remarques: 'À prendre avec un verre d’eau'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialisation si nécessaire
  }
}
