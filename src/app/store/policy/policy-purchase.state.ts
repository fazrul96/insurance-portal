import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {
  GetTermsAndConditions,
  SelectPlan,
  SubmitInitialInfo,
  SubmitInitialInfoSuccess,
  SubmitPersonalDetailsInfo,
  SubmitPolicyPurchaseStep,
  SubmitPolicyPurchaseSubStep
} from './policy-purchase.action';
import {POLICY_PURCHASE_STATE_DEFAULTS, PolicyPurchaseStateModel} from './policy-purchase.state.model';
import {PolicyDetails, PolicyPersonalDetails, PolicyPurchaseStep} from '../../core/models/policy.model';

@State<PolicyPurchaseStateModel>({
  name: 'PolicyState',
  defaults: POLICY_PURCHASE_STATE_DEFAULTS
})

@Injectable()
export class PolicyPurchaseState {
  @Selector()
  static getGender(state: PolicyPurchaseStateModel): string | undefined {
    return state.quotationDetails.personalDetails?.gender
  }

  @Selector()
  static getAge(state: PolicyPurchaseStateModel): number | undefined{
    return state.quotationDetails.personalDetails?.age;
  }

  @Selector()
  static getDateOfBirth(state: PolicyPurchaseStateModel): string | undefined{
    return state.quotationDetails.personalDetails?.dateOfBirth;
  }

  @Selector()
  static getReferenceNumber(state: PolicyPurchaseStateModel): string {
    return state.quotationDetails.quotationNumber;
  }

  @Selector()
  static plans(state: PolicyPurchaseStateModel) {
    return state.plans;
  }

  @Selector()
  static selectedPlan(state: PolicyPurchaseStateModel) {
    return state.quotationDetails.plan;
  }

  @Selector()
    static getTermsAndConditions(state: PolicyPurchaseStateModel){
        return state.termsAndConditions;
    }

  @Selector()
  static getPersonalDetails(state: PolicyPurchaseStateModel): PolicyPersonalDetails | null {
    return state.quotationDetails.personalDetails ?? null;
  }

  @Selector()
  static getCurrentMainSteps(state: PolicyPurchaseStateModel): { step: number, path: string } {
    return {
      step: state.currentMainStep?.step || 1,
      path: state.currentMainStep?.path || 'basic-information'
    };
  }

  @Selector()
  static getMainSteps(state: PolicyPurchaseStateModel): PolicyPurchaseStep[] {
    return state.mainSteps;
  }

  @Selector()
  static getSubSteps(state: PolicyPurchaseStateModel): PolicyPurchaseStep[] {
    return state.subSteps;
  }

  @Selector()
  static getQuotationDetails(state: PolicyPurchaseStateModel){
    return state.quotationDetails;
  }

  @Action(SubmitInitialInfo)
  submitInitialInfo(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: SubmitInitialInfo) {
    const state: PolicyPurchaseStateModel = ctx.getState();

    const quotationDetails: PolicyDetails = {
      quotationNumber: payload.referenceNumber,
      personalDetails: {
        age: payload.age,
        dateOfBirth: payload.dateOfBirth,
        gender:  payload.gender,
      }
    };

    ctx.setState({
      ...state,
      quotationDetails: quotationDetails,
      plans: payload.plans || []
    });
  }

  @Action(SubmitInitialInfoSuccess)
  submitInitialInfoSuccess(ctx: StateContext<PolicyPurchaseStateModel>, {payload}: SubmitInitialInfoSuccess) {
    let quotationDetails = structuredClone(ctx.getState().quotationDetails);
    // quotationDetails.gender = payload.gender;
    // quotationDetails.dateOfBirth = payload.dateOfBirth;
    // quotationDetails.quotationNumber = payload.referenceNumber;
    // quotationDetails.age = payload.ageNearestBirthday,
    const updatedDetails = {
      quotationNumber: payload.quotationNumber,
      plan: undefined,
      personalDetails: {
        // gender: payload.gender,
        // dateOfBirth: payload.dateOfBirth,
        // age: payload.ageNearestBirthday,
        ...payload.personalDetails,
        title: '',
        fullName: '',
        nationality: '',
        idNo: '',
        otherId: '',
        isUsPerson: false,
        countryOfBirth: '',
        isSmoker: false,
        cigarettesPerDay: 0,
        countryCode: '',
        mobileNo: '',
        occupation: '',
        email: '',
        transactionPurpose: ''
      }
    };

    ctx.patchState({
      quotationDetails: updatedDetails,
      plans: payload.plans
    });

    // ctx.patchState({
    //   quotationDetails: quotationDetails,
    //   plans: payload.plans
    // });
  }

  @Action(SelectPlan)
  selectPlan(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: SelectPlan) {
    const quotationDetails = structuredClone(ctx.getState().quotationDetails);
    // const selectedPlan: PolicyPlan = {
    //   coverageTerm: payload.coverageTerm,
    //   paymentPeriod: 'monthly',
    //   planName: payload.planName,
    //   premiumAmount: 4000,
    //   sumAssured: payload.sumAssured
    // }
    const updatedQuotation = {
      ...quotationDetails,
      plan: payload
    };

    // quotationDetails.plan = selectedPlan;
    console.log('Patch log plan\: ', updatedQuotation.plan)
    ctx.patchState({ quotationDetails: updatedQuotation });
  }


  @Action(SubmitPersonalDetailsInfo)
  submitPersonalDetailsInfo(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: SubmitPersonalDetailsInfo): void {
    const state: PolicyPurchaseStateModel = ctx.getState();
    const quotationDetails: PolicyDetails = structuredClone(state.quotationDetails || {});

    quotationDetails.personalDetails = {
      title: payload.title,
      fullName: payload.fullName,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      age: payload.age,
      nationality: payload.nationality,
      idNo: payload.idNo,
      otherId: payload.otherId,
      isUsPerson: payload.isUsPerson,
      countryOfBirth: payload.countryOfBirth,
      isSmoker: payload.isSmoker,
      cigarettesPerDay: payload.cigarettesPerDay,
      countryCode: payload.countryCode,
      mobileNo: payload.mobileNo,
      occupation: payload.occupation,
      email: payload.email,
      transactionPurpose: payload.transactionPurpose
    };

    ctx.setState({
      ...state,
      quotationDetails
    });
  }

  @Action(SubmitPolicyPurchaseStep)
  setCurrentMainStep(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: SubmitPolicyPurchaseStep): void {
    const state: PolicyPurchaseStateModel = ctx.getState();

    ctx.setState({
      ...state,
      currentMainStep: {
        path: payload.path,
        step: payload.step
      }
    });
  }

  @Action(SubmitPolicyPurchaseSubStep)
  setCurrentSubStep(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: SubmitPolicyPurchaseSubStep): void {
    const state: PolicyPurchaseStateModel = ctx.getState();

    ctx.setState({
      ...state,
      currentSubStep: {
        path: payload.path,
        step: payload.step
      }
    });
  }

  @Action(GetTermsAndConditions)
  setTermsAndConditions(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: GetTermsAndConditions) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      termsAndConditions: payload || []
    });
  }
}
