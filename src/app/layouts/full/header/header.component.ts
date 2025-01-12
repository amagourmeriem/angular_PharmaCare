import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Router } from '@angular/router';  // Importez Router pour la redirection
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, TablerIconsModule, MaterialModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode de déconnexion
  logout(): void {
    console.log('Logout called');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.navigate(['/authentication/login']);
  }
  
  // Toggle pour le menu mobile (si nécessaire)
  toggleMobileNavMenu(): void {
    this.toggleMobileNav.emit();
  }
}
