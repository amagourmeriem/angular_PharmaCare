import { Component } from '@angular/core';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatDivider } from '@angular/material/divider';



@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
  standalone: true,
  imports: [
    MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule, MatList, MatListItem, CommonModule, MatDivider
],
})
export class PrescriptionsComponent {
  prescriptions = [
    {
      id: 1,
      patientName: 'John Doe',
      date: new Date(),
      description: 'Follow-up after surgery',
      medications: [
        { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice a day' },
        { name: 'Ibuprofen', dosage: '200mg', frequency: 'Three times a day' },
      ],
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: new Date(),
      description: 'Treatment for flu',
      medications: [
        { name: 'Amoxicillin', dosage: '250mg', frequency: 'Twice a day' },
      ],
    },
  ];

  selectedPrescription: any = null;

  // Méthode pour ajouter une nouvelle prescription
  addPrescription() {
    alert('Add Prescription functionality to be implemented!');
  }

  // Méthode pour sélectionner une prescription
  selectPrescription(prescription: any) {
    this.selectedPrescription = prescription;
  }
}
