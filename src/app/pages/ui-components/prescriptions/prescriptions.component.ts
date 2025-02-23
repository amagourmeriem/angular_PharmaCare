import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PharmacienService } from 'src/app/services/pharmacien.service';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatPaginatorModule],  // ✅ Ajout de MatPaginatorModule
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
})
export class PrescriptionsComponent implements OnInit {
  displayedColumns: string[] = ['codePatient', 'description', 'medicaments', 'createdAt'];
  dataSource = new MatTableDataSource<any>();  // ✅ Utilisation de MatTableDataSource pour la pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pharmacienService: PharmacienService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadOrdonnances();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // ✅ Charger les ordonnances existantes avec pagination
  loadOrdonnances() {
    this.pharmacienService.getOrdonnances().subscribe(
      (data) => {
        console.log('Données reçues:', data);
  
        const formattedData = data.map((ordonnance: any) => ({
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

        this.dataSource.data = formattedData;
      },
      (error) => {
        console.error('Erreur lors de la récupération des ordonnances', error);
      }
    );
  }

  // ✅ Ouvrir le modal pour ajouter une ordonnance et mettre à jour la liste
  openAddPrescriptionDialog() {
    const dialogRef = this.dialog.open(AddPrescriptionComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((nouvelleOrdonnance) => {
      if (nouvelleOrdonnance) {
        console.log('Nouvelle ordonnance ajoutée:', nouvelleOrdonnance);
        console.log('Médicaments:', nouvelleOrdonnance.medicaments);

        const newOrdonnance = {
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
        };

        this.dataSource.data = [newOrdonnance, ...this.dataSource.data];
      }
    });
  }
}
