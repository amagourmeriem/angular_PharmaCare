import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  constructor(private router: Router, private authService: AuthService) { }

  // Mettre à jour le formulaire pour utiliser `emailOrCode` et `password`
  form = new FormGroup({
    emailOrCode: new FormControl('', [Validators.required]),  // Changement ici de 'uname' à 'emailOrCode'
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  
    const { emailOrCode, password } = this.form.value;
  
    // Vérifier que `emailOrCode` et `password` ne sont pas null ou undefined
    if (!emailOrCode || !password) {
      console.error('Email or Code and password are required');
      return; // Empêcher l'envoi si l'un des champs est vide
    }
  
    // Appeler le service AuthService pour se connecter
    this.authService.login(emailOrCode, password).subscribe(
      (response) => {
        // Si la connexion est réussie, stocker le token et rediriger
        const token = response.token;
        this.authService.saveToken(token);  // Sauvegarder le token
        console.log('Login successful');
        this.router.navigate(['/dashboard']);  // Redirection vers une page après connexion
      },
      (error) => {
        console.error('Login failed', error);
        // Afficher un message d'erreur ou gérer le cas d'échec
      }
    );
  }
  
}
