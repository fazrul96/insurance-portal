import {Component, inject, OnInit} from '@angular/core';
import {NxColComponent, NxLayoutComponent, NxRowComponent,} from '@aposin/ng-aquila/grid';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {PolicyProductDetails} from '../../store/policy-product/policy-product.action';
import {PolicyProductState} from '../../store/policy-product/policy-product.state';
import {UserState} from '../../store/user/user.state';
import {PolicyProductService} from '../../core/services/policy-product.service';
import {PolicyDetails} from '../../core/models/policy.model';

@Component({
  selector: 'app-policy-product',
  imports: [NxLayoutComponent, NxColComponent, NxRowComponent, NxLinkComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store);
  private policyProductService =  inject(PolicyProductService);
  numOfPolicy: number = 0;

  ngOnInit() {
    const user = this.store.selectSnapshot(UserState.getUser);
    this.policyProductService.getAllPolicies(user).subscribe({
      next: (response: any): void => {
        this.store.dispatch(new PolicyProductDetails(response));
        const policyProduct: PolicyDetails[] = this.store.selectSnapshot(PolicyProductState.getPolicyDetailsList);
        this.numOfPolicy = policyProduct.length;
      },
      error: (error): void => {
        console.error('❌ API call failed:', error);
      }
    });
  }

  goToUserPolicies() {
    this.router.navigate(['policy-servicing']);
  }

  goToInitialForm() {
    this.router.navigate(['policy-purchase']);
  }
}
