import {Routes} from '@angular/router';
import {PolicyPurchaseComponent} from './features/policy-purchase/policy-purchase.component';
import {PolicyServicingComponent} from './features/policy-servicing/policy-servicing.component';
import {ClaimManagementComponent} from './features/claim-management/claim-management.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';

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
  { path: ROUTE_PATHS.policyPurchase, component: PolicyPurchaseComponent },
  { path: ROUTE_PATHS.policyServicing, component: PolicyServicingComponent },
  { path: ROUTE_PATHS.claimManagement, component: ClaimManagementComponent }
];
