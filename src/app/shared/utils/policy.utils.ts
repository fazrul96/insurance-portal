import {PolicyStatus} from './enum-policy-status';

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

export function getCoverageAmount(): number {
  const amounts = [100000, 150000, 600000];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

export function getPolicyStatusColor(status: PolicyStatus): string {
  switch (status) {
    case PolicyStatus.Active:
      return 'green';
    case PolicyStatus.Cancelled:
      return 'red';
    case PolicyStatus.PendingApproval:
      return 'orange';
    default:
      return 'black';
  }
}

export function getPolicyStatus(status: string): PolicyStatus {
  return status as PolicyStatus;
}
