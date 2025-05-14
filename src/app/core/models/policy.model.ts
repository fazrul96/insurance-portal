export interface PolicyDetails {
  quotationNumber: string;
  plan?: PolicyPlan;
  personalDetails?: PolicyPersonalDetails
}

export interface PolicyPlanDto {
  id: string;
  planName: string;
  sumAssured: number;
  coverageTerm: string;
  monthlyPremium: number;
  yearlyPremium: number;
  paymentPeriod: string;
}

export interface PolicyPlan {
  id: string;
  planName: string;
  sumAssured: number;
  coverageTerm: string;
  premiumAmount: number;
  premiumMode?: string;
  paymentPeriod?: string;
}

export interface PolicyPersonalDetails {
  [key: string]: any;
  title?: string;
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  age?: number;
  nationality?: string;
  idNo?: string;
  otherId?: string;
  isUsPerson?: boolean;
  countryOfBirth?: string;
  isSmoker?: boolean;
  cigarettesPerDay?: number;
  countryCode?: string;
  // areaCode?: string;
  mobileNo?: string;
  occupation?: string;
  email?: string;
  transactionPurpose?: string;
}

export interface PolicyPurchaseStep {
  path: string;
  step: number;
}

export interface TermsConditions {
  id: number;
  termsHtml: string;
  isRequired: number;
  status: string;
}
