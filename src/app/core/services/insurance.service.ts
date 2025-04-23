import {Injectable} from '@angular/core';
import {CardItem, DASHBOARD_CARDS_PRODUCTS} from '../../shared/data/dashboard-cards.data';
import {delay, Observable, of} from 'rxjs';
import {createPolicy, getCoverageAmount} from '../../shared/utils/policy.utils';
import {Policy} from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  policies: Policy[] = [];

  constructor() {
    this.mockPolicies();
  }

  getInsuranceTypes(): Observable<CardItem[]> {
    return of(DASHBOARD_CARDS_PRODUCTS).pipe(delay(1000));
  }

  getPolicies(): Policy[] {
    return this.policies;
  }

  addPolicy(policy: { insuredName: string; coverageAmt: number }) {
    const newPolicy = createPolicy(policy.insuredName, policy.coverageAmt);
    this.policies.push(newPolicy);
  }

  private mockPolicies() {
    this.policies = DASHBOARD_CARDS_PRODUCTS.map(type =>
      createPolicy(type.title, getCoverageAmount())
    );
  }
}
