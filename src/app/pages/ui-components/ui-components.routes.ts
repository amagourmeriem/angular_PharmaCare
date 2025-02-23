import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { PatientsListComponent } from './patients-list/patients-list.component'; // Import du nouveau composant
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { MedicationsComponent } from './medications/medications.component';
import { ProfileComponent } from './profile/profile.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'patients-list', // Nouvelle route
        component: PatientsListComponent, // Lien vers le composant PatientsList
      },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent, // Lien vers le composant Prescriptions
      },
      {
        path: 'medications',
        component: MedicationsComponent, // Lien vers le composant Medications
      },
      {
        path: 'profile',
        component: ProfileComponent, // Lien vers le composant Medications
      },
    ],
  },
];
