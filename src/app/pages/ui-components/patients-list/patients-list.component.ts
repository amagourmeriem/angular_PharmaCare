import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Patient, PatientService } from 'src/app/services/patients.service';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Add this import
import { CommonModule } from '@angular/common';

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
    MatPaginator,
    MatPaginatorModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'tel', 'codePatient', 'cin', 'status'];  // Added status column
  patients: any[] = []; // List of patients
  dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private patientService: PatientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // Method to load patients
  private loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data: Patient[]) => {
        console.log('Réponse brute des patients :', data);
        this.dataSource.data = data; // Assign data to the data source
        this.dataSource.paginator = this.paginator; // Bind the paginator
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des patients :', err);
      },
    });
  }

  openAddPatientModal(): void {
    const dialogRef = this.dialog.open(AddPatientModalComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe((newPatient) => {
      if (newPatient) {
        // Add the new patient to the list
        this.dataSource.data = [...this.dataSource.data, newPatient]; // Immutable update
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  
  
 // Cette méthode sera appelée lorsque le patient est ajouté
  onPatientAdded(): void {
    this.loadPatients(); // Actualiser la liste des patients
  }
}
