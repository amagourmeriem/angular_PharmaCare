import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PharmacienService } from 'src/app/services/pharmacien.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-add-patient-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCard  
  ],
  templateUrl: './add-patient-modal.component.html',
  styleUrls: ['./add-patient-modal.component.scss']
})
export class AddPatientModalComponent {
  @Output() patientAdded: EventEmitter<void> = new EventEmitter<void>(); // Émettre un événement pour informer le parent
  addPatientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPatientModalComponent>,
    private pharmacienService: PharmacienService
  ) {
    this.addPatientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      cin: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addPatientForm.valid) {
      const patientData = this.addPatientForm.value;

      // Envoi des données au backend
      this.pharmacienService.createPatient(patientData).subscribe({
        next: (response: any) => {
          console.log('Patient ajouté avec succès :', response);

          // Émettre un événement pour informer le parent
          this.patientAdded.emit();

          // Fermer le modal après l'ajout
          this.dialogRef.close();
        },
        
        error: (err: any) => {
          console.error('Erreur lors de l’ajout du patient :', err);
        },        
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Fermer le modal sans action
  }
}
