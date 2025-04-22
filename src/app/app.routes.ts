import {Routes} from '@angular/router';
import {PolicyPurchaseComponent} from './features/policy-purchase/policy-purchase.component';
import {PolicyServicingComponent} from './features/policy-servicing/policy-servicing.component';
import {ClaimManagementComponent} from './features/claim-management/claim-management.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {AuthGuard} from '@auth0/auth0-angular';

export const ROUTE_PATHS = {
  root: '',
  callback: 'callback',
  dashboard: 'dashboard',
  policyPurchase: 'policy-purchase',
  policyServicing: 'policy-servicing',
  claimManagement: 'claim-management'
};

export const routes: Routes = [
  { path: ROUTE_PATHS.root, component: DashboardComponent },
  { path: ROUTE_PATHS.callback, component: DashboardComponent },
  { path: ROUTE_PATHS.dashboard, component: DashboardComponent },
  { path: ROUTE_PATHS.policyPurchase, component: PolicyPurchaseComponent, canActivate: [AuthGuard] },
  { path: ROUTE_PATHS.policyServicing, component: PolicyServicingComponent, canActivate: [AuthGuard] },
  { path: ROUTE_PATHS.claimManagement, component: ClaimManagementComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'login/callback',
  //   component: OktaCallbackComponent,
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  // },
  // {
  //   path: 'main',
  //   loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  //   canActivate: [AuthGuard],
  //   data: {
  //     okta: { acrValues: 'urn:okta:loa:2fa:any' },
  //   },
  // },
];
