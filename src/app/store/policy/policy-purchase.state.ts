import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {
  GetTermsAndConditions,
  PostPayment,
  PostPolicyApplication,
  PostQuotationPlans,
  SelectPlan,
  SubmitInitialInfoSuccess,
  SubmitPersonalDetailsInfo,
  SubmitPolicyPurchaseStep,
  SubmitPolicyPurchaseSubStep
} from './policy-purchase.action';
import {
  ClaimListStateModel,
  POLICY_PURCHASE_STATE_DEFAULTS,
  PolicyPurchaseStateModel
} from './policy-purchase.state.model';
import {PolicyDetails, PolicyPersonalDetails, PolicyPurchaseStep} from '../../core/models/policy.model';
import {PolicyService} from '../../core/services/policy.service';
import {Claims} from '../../core/models/policy-claim.model';
import {PolicyClaimService} from '../../core/services/policy-claim.service';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {formatCamelCase} from '../../shared/utils/string-utils';

@State<PolicyPurchaseStateModel>({
  name: 'PolicyPurchaseState',
  defaults: POLICY_PURCHASE_STATE_DEFAULTS
})

@Injectable()
export class PolicyPurchaseState {
  private policyService: PolicyService = inject(PolicyService);
  private claimService: PolicyClaimService = inject(PolicyClaimService);

  @Selector()
  static getClaimList(state: ClaimListStateModel): Claims  {
    return state.claimList;
  }

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

  @Action(SubmitInitialInfoSuccess)
  submitInitialInfoSuccess(ctx: StateContext<PolicyPurchaseStateModel>, {payload}: SubmitInitialInfoSuccess) {
    const updatedDetails = {
      quotationNumber: payload.quotationNumber,
      plan: undefined,
      personalDetails: {
        ...payload.personalDetails,
        title: '',
        fullName: '',
        nationality: '',
        idNo: '',
        otherId: '',
        isUsPerson: false,
        countryOfBirth: '',
        isSmoker: false,
        cigarettesNo: 0,
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
  }

  @Action(SelectPlan)
  selectPlan(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: SelectPlan) {
    const quotationDetails: PolicyDetails = structuredClone(ctx.getState().quotationDetails);
    const updatedQuotation = {
      ...quotationDetails,
      plan: payload
    };

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
  getTermsAndConditions(ctx: StateContext<PolicyPurchaseStateModel>) {
    return this.policyService.getTermsAndConditions().pipe(
      tap((response: HttpResponseBody) => {
        const state: PolicyPurchaseStateModel = ctx.getState();

        ctx.setState({
          ...state,
          termsAndConditions: response.data || []
        });
      }),
      map((response: any) => response.message)
    );
  }

  @Action(PostQuotationPlans)
  postQuotationPlans(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: SubmitPolicyPurchaseSubStep ) {
    return this.policyService.postQuotationPlans(payload).pipe(
      tap((response: HttpResponseBody) => {
        const state: PolicyPurchaseStateModel = ctx.getState();
        const quotationDetails: PolicyDetails = {
          quotationNumber: response.data.referenceNumber,
          personalDetails: {
            age: response.data.ageNearestBirthday,
            dateOfBirth: response.data.dateOfBirth,
            gender: formatCamelCase(response.data.gender),
          }
        };

        ctx.setState({
          ...state,
          quotationDetails: quotationDetails,
          plans: response.data.plans || []
        });
      }),
      map((response: any) => response.message)
    );
  }

  @Action(PostPolicyApplication)
  postPolicyApplication(ctx: StateContext<any>, { payload }: PostPolicyApplication ) {
    return this.policyService.postPolicyApplication(payload).pipe(
      tap((response: HttpResponseBody): void => {
        const state: PolicyPurchaseStateModel = ctx.getState();

        ctx.setState({
          ...state,
          quotationDetails: {
            ...state.quotationDetails,
            quotationId: response.data.id,
            premiumMode: response.data.planResponseDto.premiumMode,
          }
        });

      }),
      map((response: any) => response.message)
    );
  }

  @Action(PostPayment)
  postPayment(ctx: StateContext<PolicyPurchaseStateModel>, { payload }: PostPayment ) {
    return this.policyService.postPayment(payload).pipe(
      map((response: any) => {
        return {
          message: response.message
        };
      })
    );
  }
}
