import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PharmacienService } from 'src/app/services/pharmacien.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [MatTableModule, MatCardHeader, MatCardTitle, MatCardContent, MatCard],
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {
  displayedColumns: string[] = ['image', 'nom', 'description'];
  medications = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pharmacienService: PharmacienService) {}

  ngOnInit() {
    this.loadMedicaments();
  }

  loadMedicaments() {
    this.pharmacienService.getMedicaments().subscribe({
      next: (data) => {
        console.log('Médicaments récupérés:', data);
        this.medications.data = data;
        this.medications.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des médicaments', err);
      }
    });
  }
}
