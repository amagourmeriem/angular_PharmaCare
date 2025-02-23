import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { PatientService } from 'src/app/services/patients.service';
import { PharmacienService } from 'src/app/services/pharmacien.service';

@Component({
  selector: 'app-add-prescription',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatOption,
    MatSelectModule,
    MatGridListModule
  ],
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {
  addPrescriptionForm!: FormGroup;
  patients: any[] = [];
  medicaments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private pharmacienService: PharmacienService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    // Initialisation du formulaire
    this.addPrescriptionForm = this.fb.group({
      codePatient: ['', Validators.required],
      description: ['', Validators.required],
      ordonnanceMedicament: this.fb.array([]) // FormArray pour plusieurs médicaments
    });

    // Charger la liste des patients
    this.patientService.getPatients().subscribe({
      next: (patients) => this.patients = patients,
      error: (err) => console.error('Erreur lors du chargement des patients', err)
    });

    // Charger la liste des médicaments
    this.pharmacienService.getMedicaments().subscribe({
      next: (medicaments) => this.medicaments = medicaments,
      error: (err) => console.error('Erreur lors du chargement des médicaments', err)
    });
  }

  // Getter pour le FormArray
  get ordonnanceMedicament(): FormArray {
    return this.addPrescriptionForm.get('ordonnanceMedicament') as FormArray;
  }


  // Ajouter un médicament au FormArray
  addMedicament() {
    const medicamentForm = this.fb.group({
      medicamentId: ['', Validators.required],
      posologie: ['', Validators.required],
      frequence: ['', Validators.required]
    });

    this.ordonnanceMedicament.push(medicamentForm);
  }

  // Supprimer un médicament du FormArray
  removeMedicament(index: number) {
    this.ordonnanceMedicament.removeAt(index);
  }

  // Soumettre le formulaire
  submitPrescription() {
    if (this.addPrescriptionForm.valid) {
      this.pharmacienService.createOrdonnance(this.addPrescriptionForm.value).subscribe({
        next: (response) => {
          console.log('Ordonnance créée avec succès', response);
          this.addPrescriptionForm.reset();
          this.ordonnanceMedicament.clear();
        },
        error: (err) => console.error('Erreur lors de la création de l’ordonnance', err)
      });
    }
  }
}
