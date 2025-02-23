import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PharmacienService } from 'src/app/services/pharmacien.service';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // ✅ Import MatTableModule
import { MatCardModule } from '@angular/material/card';    // ✅ Import MatCardModule

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],  // ✅ Ajout des modules ici
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
})
export class PrescriptionsComponent implements OnInit {
  ordonnances: any[] = [];
  displayedColumns: string[] = ['codePatient', 'description', 'medicaments', 'createdAt'];

  constructor(private pharmacienService: PharmacienService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadOrdonnances();
  }
  

  // ✅ Charger les ordonnances existantes
  loadOrdonnances() {
    this.pharmacienService.getOrdonnances().subscribe(
      (data) => {
        console.log('Données reçues:', data); // ✅ Vérification console
  
        this.ordonnances = data.map((ordonnance: any) => ({
          id: ordonnance.id,
          codePatient: ordonnance.codePatient || 'Inconnu',
          description: ordonnance.description,
          createdAt: ordonnance.createdAt ? new Date(ordonnance.createdAt).toLocaleString('fr-FR') : 'Non spécifiée',
          medicaments: ordonnance.medicaments.map((med: any) => ({
            medicamentName: med.medicamentName,
            posologie: med.posologie,
            frequence: med.frequence,
          })),
          rappels: ordonnance.rappels || [],
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des ordonnances', error);
      }
    );
  }
  

  // ✅ Ouvrir le modal pour ajouter une ordonnance
  openAddPrescriptionDialog() {
    const dialogRef = this.dialog.open(AddPrescriptionComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((nouvelleOrdonnance) => {
      if (nouvelleOrdonnance) {
        console.log('Nouvelle ordonnance ajoutée:', nouvelleOrdonnance);
    
        // Vérifier si les médicaments sont bien présents
        console.log('Médicaments:', nouvelleOrdonnance.medicaments);
    
        // Ajouter la nouvelle ordonnance à la liste existante
        this.ordonnances = [
          {
            id: nouvelleOrdonnance.id,
            codePatient: nouvelleOrdonnance.codePatient || 'Inconnu',
            description: nouvelleOrdonnance.description,
            createdAt: nouvelleOrdonnance.createdAt
              ? new Date(nouvelleOrdonnance.createdAt).toLocaleString('fr-FR')
              : 'Non spécifiée',
            medicaments: nouvelleOrdonnance.medicaments.map((med: any) => ({
              medicamentName: med.medicamentName || 'Médicament inconnu',
              posologie: med.posologie,
              frequence: med.frequence,
            })),
            rappels: nouvelleOrdonnance.rappels || [],
          },
          ...this.ordonnances,
        ];
      }
    });
    
    
  }
}
    