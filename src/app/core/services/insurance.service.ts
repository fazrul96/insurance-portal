import {Injectable} from '@angular/core';
import {CardItem, DASHBOARD_CARDS_PRODUCTS} from '../../shared/data/dashboard-cards.data';
import {of} from 'rxjs';
import {createPolicy, getRandomCoverageAmount} from '../../shared/utils/policy.utils';

export interface Policy {
  insuredName: string;
  policyNumber: string;
  coverageAmt: number;
  premium: number;
  status: string;
}

export interface PolicyPurchaseSummary {
  totalPolicies: number;
  topPolicies: { name: string; count: number }[];
  recentPurchases: { id: string; customer: string; policy: string; date: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  policies: Policy[] = [];
  insuranceTypes: CardItem[] = DASHBOARD_CARDS_PRODUCTS

  constructor() {
    this.mockPolicies();
  }

  getPolicies(): Policy[] {
    return this.policies;
  }

  addPolicy(policy: { insuredName: string; coverageAmt: number }) {
    const newPolicy = createPolicy(policy.insuredName, policy.coverageAmt);
    this.policies.push(newPolicy);
  }

  getPolicyPurchaseSummary() {
    return of({
      totalPolicies: 1200,
      topPolicies: [
        { name: 'Health Insurance', count: 520 },
        { name: 'Auto Insurance', count: 430 },
        { name: 'Home Insurance', count: 250 }
      ],
      recentPurchases: [
        { id: 'P-1001', customer: 'John Doe', policy: 'Health', date: '2025-04-20' },
        { id: 'P-1002', customer: 'Jane Smith', policy: 'Auto', date: '2025-04-19' }
      ]
    });
  }

  private mockPolicies() {
    this.policies = this.insuranceTypes.slice(0, 3).map(type =>
      createPolicy(type.title, getRandomCoverageAmount())
    );
  }
}
