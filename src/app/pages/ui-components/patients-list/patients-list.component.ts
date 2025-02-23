import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Patient, PatientService } from 'src/app/services/patients.service';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'tel', 'codePatient', 'cin', 'status'];
  dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patientService: PatientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  private loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data: Patient[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Erreur lors de la récupération des patients :', err),
    });
  }

  openAddPatientModal(): void {
    const dialogRef = this.dialog.open(AddPatientModalComponent, { width: '500px' });
    
    dialogRef.afterClosed().subscribe((newPatient) => {
      if (newPatient) {
        this.dataSource.data = [...this.dataSource.data, newPatient];
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
