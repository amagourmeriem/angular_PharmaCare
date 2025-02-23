import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PharmacienService } from 'src/app/services/pharmacien.service';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescriptions',
   standalone: true,
    imports: [CommonModule],
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],

})
export class PrescriptionsComponent implements OnInit {
  ordonnances: any[] = [];

  constructor(private pharmacienService: PharmacienService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadOrdonnances();
  }

  // ✅ Charger les ordonnances existantes
  loadOrdonnances() {
    this.pharmacienService.getOrdonnances().subscribe(
      (data) => {
        this.ordonnances = data;
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

    // Rafraîchir la liste après fermeture du modal
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadOrdonnances();
      }
    });
  }
}
