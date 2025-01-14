import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Patient, PatientService } from 'src/app/services/patients.service';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogModule
  ],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'tel', 'codePatient', 'cin'];
  patients: any[] = []; // List of patients

  constructor(private patientService: PatientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // Method to load patients
  private loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des patients :', err);
      },
    });
  }

  openAddPatientModal(): void {
    const dialogRef = this.dialog.open(AddPatientModalComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Ajouter le nouveau patient dans la liste
        this.patients.push(result);
      }
    });
  }
  
 // Cette méthode sera appelée lorsque le patient est ajouté
 onPatientAdded(): void {
  this.loadPatients(); // Actualiser la liste des patients
}
}
