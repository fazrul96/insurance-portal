import {PolicyDetails, PolicyPlanDto, PolicyPurchaseStep, TermsConditions} from "../../core/models/policy.model";
import {Claims} from '../../core/models/policy-claim.model';

export interface PolicyPurchaseStateModel {
    mainSteps: PolicyPurchaseStep[];
    subSteps: PolicyPurchaseStep[];
    currentMainStep: PolicyPurchaseStep;
    currentSubStep: PolicyPurchaseStep;
    quotationDetails: PolicyDetails;
    plans: PolicyPlanDto[];
    termsAndConditions: TermsConditions[];
}

export interface ClaimListStateModel {
  claimList: Claims,
  claimdetails?: any,
  claimdocuments?: any
}

export const CLAIM_LIST_STATE_DEFAULTS: ClaimListStateModel = {
  claimList: {
    claimId: '',
    policyId: '',
    claim_date: '',
    claimStatus: '',
    claimType: '',
    claimdetails:undefined,
    claimdocuments:undefined
  }
}

export const POLICY_PURCHASE_STATE_DEFAULTS: PolicyPurchaseStateModel = {
    quotationDetails: {
        quotationNumber: '',
        plan: undefined,
        personalDetails: undefined,
    },
    plans: [],
    termsAndConditions: [],
    mainSteps: [
      { path: 'basic-information', step: 1 },
      { path: 'get-quote', step: 2 },
      { path: 'apply-now', step: 3 }
    ],
    currentMainStep: {
      path: 'basic-information',
      step: 1
    },
    subSteps: [
      { path: 'info-details', step: 1 },
      { path: 'info-summary', step: 2 },
      { path: 'info-receipt', step: 3 }
    ],
    currentSubStep: {
      path: 'info-details',
      step: 1
    },
}
