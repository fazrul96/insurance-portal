import {PolicyStatus} from './enum-policy-status';
import {Policy} from '../../core/models/policy.model';

export function generatePolicyNumber(): string {
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  return `PN-${randomNumber}`;
}

export function calculatePremium(coverageAmt: number): number {
  return +(coverageAmt * 0.10).toFixed(2);
}

export function checkPolicyStatus(coverageAmt: number): PolicyStatus {
  return coverageAmt < 500000
    ? PolicyStatus.Active
    : PolicyStatus.PendingApproval;
}

export function getRandomCoverageAmount(): number {
  const amounts = [100000, 150000, 600000];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

export function createPolicy(insuredName: string, coverageAmt: number): Policy {
  return {
    policyNumber: generatePolicyNumber(),
    insuredName,
    coverageAmt,
    premium: calculatePremium(coverageAmt),
    status: checkPolicyStatus(coverageAmt),
  };
}
