import {Action, Selector, State, StateContext} from '@ngxs/store';
import {POLICY_PRODUCT_STATE_DEFAULT, PolicyStateModel,} from './policy-product.state.model';
import {inject, Injectable} from '@angular/core';
import {LoadAllPolicies, PostListBeneficiaries, UpdateInsuredInfo} from './policy-product.action';
import {PolicyDetails} from '../../core/models/policy.model';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {map, tap} from 'rxjs';
import {PolicyProductService} from '../../core/services/policy-product.service';

@State<PolicyStateModel>({
  name: 'PolicyProductState',
  defaults: POLICY_PRODUCT_STATE_DEFAULT,
})
@Injectable()
export class PolicyProductState {
  private policyProductService:PolicyProductService =  inject(PolicyProductService);

  @Selector()
  static getPolicyDetailsList(state: PolicyStateModel): PolicyDetails[] {
    return structuredClone(state.policyList);
  }

  @Selector()
  static getPolicyBeneficiaries(state: PolicyStateModel): any {
    return structuredClone(state.policyBeneficiaries);
  }

  @Action(LoadAllPolicies)
  loadAllPolicies(ctx: StateContext<PolicyStateModel>) {
    return this.policyProductService.getAllPolicies().pipe(
      tap((response: HttpResponseBody) => {
        const state: PolicyStateModel = ctx.getState();
        const transformedPolicies: PolicyDetails[] = response.data.map((item: any) => ({
          quotationNumber: item.policyNo,
          plan: {
            id: item.applicationResponseDto.planResponseDto.id,
            planName: item.applicationResponseDto.planResponseDto.planName,
            sumAssured: item.applicationResponseDto.planResponseDto.sumAssured,
            coverageTerm: item.applicationResponseDto.planResponseDto.coverageTerm,
            premiumAmount: item.applicationResponseDto.planResponseDto.premiumAmount,
            premiumMode: item.applicationResponseDto.planResponseDto.premiumMode,
            referenceNumber: item.applicationResponseDto.planResponseDto.referenceNumber,
            endDate: item.endDate,
            startDate: item.startDate,
            status: item.status,
            policyNo: item.policyNo,
            policyId: item.id,
          },
          personalDetails: {
            policyId: item.id,
            fullName: item.applicationResponseDto.fullName,
            gender: item.applicationResponseDto.gender,
            nationality: item.applicationResponseDto.nationality,
            identificationNo: item.applicationResponseDto.identificationNo,
            countryOfBirth: item.applicationResponseDto.countryOfBirth,
            phoneNo: item.applicationResponseDto.phoneNo,
            email: item.applicationResponseDto.email,
            dateOfBirth: item.applicationResponseDto.dateOfBirth,
            isSmoker: item.applicationResponseDto.isSmoker,
            cigarettesNo: item.applicationResponseDto.cigarettesNo,
            occupation: item.applicationResponseDto.occupation,
            purposeOfTransaction: item.applicationResponseDto.purposeOfTransaction,
            title: item.applicationResponseDto.title,
            countryCode: item.applicationResponseDto.countryCode
          }
        }));

        const policyBeneficiaries: any = response.data.map((item: any)=> ({
          policyNo: item.policyNo,
          beneficiaryList: item.beneficiaryList,
        }))

        ctx.setState({
          ...state,
          policyList: transformedPolicies,
          policyBeneficiaries: policyBeneficiaries,
        });
      }),
      map((response: HttpResponseBody) => response.message)
    );
  }

  @Action(PostListBeneficiaries)
  postListBeneficiaries(ctx: StateContext<PolicyStateModel>, { payload }: PostListBeneficiaries) {
    return this.policyProductService.postListBeneficiaries(payload).pipe(
      map((response: HttpResponseBody) => {
        return {
          message: response.message
        };
      })
    );
  }

  @Action(UpdateInsuredInfo)
  updateInsuredInfo(ctx: StateContext<PolicyStateModel>, action: UpdateInsuredInfo) {
    const { policyId, updatedInfo } = action;
    const state = ctx.getState();

    return this.policyProductService.updateInsuredInfo(policyId, updatedInfo).pipe(
      tap((response: HttpResponseBody) => {
        if (response.status === 'Success' && response.code === 200) {
          const updatedPolicies = state.policyList.map(policy =>
            policy.personalDetails?.policyId === policyId
              ? {
                ...policy,
                personalDetails : {
                  ...policy.personalDetails,
                  ...updatedInfo
                }
              }
              : policy
          );

          ctx.patchState({
            ...state,
            policyList: updatedPolicies
          });
        } else {
          console.warn('Update failed on backend')
        }
      })
    );
  }
}

