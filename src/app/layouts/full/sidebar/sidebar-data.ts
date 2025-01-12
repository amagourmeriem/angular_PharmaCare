import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard', // Tabler Icon: layout-dashboard
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    displayName: 'Profile',
    iconName: 'user', // Tabler Icon: user
    bgcolor: 'warning',
    route: '/ui-components/profile',
  },
  {
    navCap: 'Healthcare',
  },
  {
    displayName: 'Patients',
    iconName: 'user-heart', // Tabler Icon: user-heart (pour les patients)
    bgcolor: 'primary',
    route: '/ui-components/patients-list',
  },
  {
    displayName: 'Prescriptions',
    iconName: 'file', // Tabler Icon: file-medical
    bgcolor: 'warning',
    route: '/ui-components/prescriptions',
  },
  {
    displayName: 'Pharmacy',
    iconName: 'shopping-bag', // Tabler Icon: shopping-bag (pour pharmacie)
    bgcolor: 'success',
    route: '/ui-components/medications',
  },
  {
    displayName: 'Badge',
    iconName: 'award', // Tabler Icon: award (ou rosette si disponible)
    bgcolor: 'accent',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard', // Tabler Icon: layout-dashboard
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip', // Tabler Icon: poker-chip
    bgcolor: 'warning',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list', // Tabler Icon: list
    bgcolor: 'success',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'menu', // Tabler Icon: menu
    bgcolor: 'error',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'info-circle', // Tabler Icon: info-circle (ou tooltip si disponible)
    bgcolor: 'primary',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock', // Tabler Icon: lock
    bgcolor: 'accent',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus', // Tabler Icon: user-plus
    bgcolor: 'warning',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'smile', // Tabler Icon: smile
    bgcolor: 'success',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'file-text', // Tabler Icon: file-text
    bgcolor: 'error',
    route: '/extra/sample-page',
  },
];
