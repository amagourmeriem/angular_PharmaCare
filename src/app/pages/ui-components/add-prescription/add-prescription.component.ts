import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
    private patientService: PatientService,
    private dialogRef: MatDialogRef<AddPrescriptionComponent> // ✅ Ajout pour fermer le modal

  ) {}

  ngOnInit() {
    // Initialisation du formulaire
    this.addPrescriptionForm = this.fb.group({
      codePatient: ['', Validators.required],
      nom: ['', Validators.required], // ✅ Ajout du champ nom
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
      frequence: ['', Validators.required],
      message: ['', Validators.required], // ✅ Ajout du message de rappel
      dateRappel: ['', Validators.required] // ✅ Ajout de la date de rappel
    });

    this.ordonnanceMedicament.push(medicamentForm);
  }

  // Supprimer un médicament du FormArray
  removeMedicament(index: number) {
    this.ordonnanceMedicament.removeAt(index);
  }

  submitPrescription() {
    if (this.addPrescriptionForm.valid) {
      const formValue = this.addPrescriptionForm.value;
  
      // ✅ Construire l'objet à envoyer avec types définis
      const ordonnance = {
        nom: "Ordonnance" + new Date().getTime(), // Générer un nom unique
        description: formValue.description,
        createdAt: new Date().toISOString(), // Ajouter la date actuelle
        codePatient: formValue.codePatient,
        medicaments: formValue.ordonnanceMedicament.map((med: { medicamentId: number; posologie: string; frequence: string }) => ({
          medicamentId: med.medicamentId,
          medicamentName: this.medicaments.find(m => m.id === med.medicamentId)?.nom || "Médicament inconnu",
          posologie: med.posologie,
          frequence: med.frequence
        })),
        rappels: [] // ✅ Ajouter une liste vide pour éviter null
      };
  
      this.pharmacienService.createOrdonnance(ordonnance).subscribe({
        next: (response) => {
          console.log('✅ Ordonnance créée avec succès', response);
          
          // Fermer le modal et renvoyer la nouvelle ordonnance
          this.dialogRef.close(response);
        },
        error: (err) => console.error('❌ Erreur lors de la création de l’ordonnance', err)
      });      
    }
  }
  
  

// ✅ Méthode pour fermer le modal sans sauvegarder
onCancel(): void {
  this.dialogRef.close(); 
}

}