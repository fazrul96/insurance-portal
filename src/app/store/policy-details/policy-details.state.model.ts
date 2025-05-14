import {PolicyDetails} from '../../core/models/policy.model';

export interface PolicyDetailsStateModel {
    policyDetails: PolicyDetails
}

export const POLICY_DETAILS_STATE_DEFAULTS: PolicyDetailsStateModel = {
    policyDetails: {
        quotationNumber: '',
        plan: undefined,
        personalDetails: undefined
    }
}
