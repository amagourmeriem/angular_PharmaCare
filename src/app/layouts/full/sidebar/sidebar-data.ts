import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Healthcare',
  },
  {
    displayName: 'Patients',
    iconName: 'person',
    bgcolor: 'primary',
    route: '/ui-components/patients-list',
  },
  {
    displayName: 'Prescriptions',
    iconName: 'note-add',
    bgcolor: 'accent',
    route: '/ui-components/prescriptions',
  },
  {
    displayName: 'Pharmacy',
    iconName: 'pharmacy',
    bgcolor: 'success',
    route: '/ui-components/medications',
  },
  {
    displayName: 'Badge',
    iconName: 'rosette',
    bgcolor: 'accent',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
 
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    bgcolor: 'warning',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    bgcolor: 'success',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    bgcolor: 'error',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    bgcolor: 'primary',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    bgcolor: 'accent',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    bgcolor: 'warning',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    bgcolor: 'success',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/extra/sample-page',
  },
];
