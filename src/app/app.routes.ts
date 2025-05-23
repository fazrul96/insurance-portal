import {Routes} from '@angular/router';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {userAuthGuard} from './shared/guards/user-auth.guard';

export const ROUTE_PATHS = {
  root: '',
  callback: 'callback',
  login: 'login',
  registration: 'registration',
  dashboard: 'dashboard',
  policyPurchase: 'policy-purchase',
  policyServicing: 'policy-servicing',
  policyServicingDetails: 'policy-servicing-details/:policyNo',
  claimManagement: 'claim-management',
};

export const routes: Routes = [
  { path: ROUTE_PATHS.callback, component: DashboardComponent },
  { path: ROUTE_PATHS.login,
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  { path: ROUTE_PATHS.registration,
    loadComponent: () => import('./features/user-registration/user-registration.component').then(m => m.UserRegistrationComponent)
  },
  { path: ROUTE_PATHS.dashboard,
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [userAuthGuard]
  },
  { path: ROUTE_PATHS.policyPurchase,
    loadComponent: () => import('./features/policy-purchase/policy-purchase.component').then(m => m.PolicyPurchaseComponent),
    canActivate: [userAuthGuard]
  },
  { path: ROUTE_PATHS.policyServicing,
    loadComponent: () => import('./features/policy-servicing/policy-servicing.component').then(m => m.PolicyServicingComponent),
    canActivate: [userAuthGuard]
  },
  { path: ROUTE_PATHS.policyServicingDetails,
    loadComponent: () => import('./features/policy-servicing-details/policy-servicing-details.component').then(m => m.PolicyServicingDetailsComponent),
    canActivate: [userAuthGuard]
  },
  { path: ROUTE_PATHS.claimManagement,
    loadComponent: () => import('./features/claim-management/claim-management.component').then(m => m.ClaimManagementComponent),
    canActivate: [userAuthGuard]
  },
  { path: ROUTE_PATHS.root,
    redirectTo: ROUTE_PATHS.login,
    pathMatch: 'full'
  },
  { path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
];
