import {Routes} from '@angular/router';
import {PolicyPurchaseComponent} from './features/policy-purchase/policy-purchase.component';
import {PolicyServicingComponent} from './features/policy-servicing/policy-servicing.component';
import {ClaimManagementComponent} from './features/claim-management/claim-management.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'callback', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'policy-purchase', component: PolicyPurchaseComponent },
  { path: 'policy-servicing', component: PolicyServicingComponent },
  { path: 'claim-management', component: ClaimManagementComponent },
];

