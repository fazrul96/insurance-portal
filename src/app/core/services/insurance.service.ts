import {Injectable} from '@angular/core';
import {CardItem, DASHBOARD_CARDS_PRODUCTS} from '../../shared/data/dashboard-cards.data';
import {PolicyStatus} from '../../shared/utils/enum-policy-status';

export interface Policy {
  insuredName: string;
  policyNumber: string;
  coverageAmt: number;
  premium: number;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private policies: Policy[] = [];
  private insuranceTypes: CardItem[] = DASHBOARD_CARDS_PRODUCTS

  constructor() {
    this.policies.push(this.createPolicy((this.insuranceTypes)[0].title, 150000));
    this.policies.push(this.createPolicy((this.insuranceTypes)[1].title, 600000));
    this.policies.push(this.createPolicy((this.insuranceTypes)[2].title, 100000));
  }

  getPolicies(): Policy[] {
    return this.policies;
  }

  addPolicy(policy: { insuredName: string; coverageAmt: number }) {
    const newPolicy = this.createPolicy(policy.insuredName, policy.coverageAmt);
    this.policies.push(newPolicy);
  }

  private createPolicy(insuredName: string, coverageAmt: number): Policy {
    const policyNumber = this.generatePolicyNumber();
    const premium = this.calculatePremium(coverageAmt);
    const status = coverageAmt < 500000
      ? PolicyStatus.Active
      : PolicyStatus.PendingApproval;

    return {
      policyNumber,
      insuredName,
      coverageAmt,
      premium,
      status,
    };
  }

  private calculatePremium(coverageAmt: number): number {
    return coverageAmt * 0.10;
  }

  private generatePolicyNumber(): string {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    return `PN-${randomNumber}`;
  }
}
