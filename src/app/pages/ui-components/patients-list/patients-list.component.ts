import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatIconModule, TablerIconsModule, MatButtonModule],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent {
  // Colonnes affichées dans le tableau
  displayedColumns: string[] = ['nomPrenom', 'telephone', 'codePatient', 'cin'];

  // Données fictives pour le tableau
  patients = [
    {
      nom: 'El Mansouri',
      prenom: 'Ahmed',
      telephone: '0661122334',
      codePatient: 'P001',
      cin: 'AB123456',
    },
    {
      nom: 'Benslimane',
      prenom: 'Fatima',
      telephone: '0665566778',
      codePatient: 'P002',
      cin: 'CD789012',
    },
    {
      nom: 'Lamrani',
      prenom: 'Youssef',
      telephone: '0669988776',
      codePatient: 'P003',
      cin: 'EF345678',
    },
  ];
}
