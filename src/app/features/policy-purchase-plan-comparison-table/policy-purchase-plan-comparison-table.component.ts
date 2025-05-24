import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngxs/store';
import {NxButtonComponent, NxPlainButtonComponent,} from '@aposin/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
  NxComparisonTableViewType,
} from '@aposin/ng-aquila/comparison-table';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {NxPopoverComponent, NxPopoverTriggerDirective,} from '@aposin/ng-aquila/popover';
import {PolicyPurchaseState} from '../../store/policy/policy-purchase.state';
import {Observable, take} from 'rxjs';
import {PolicyDetails, PolicyPlan, PolicyPlanDto} from '../../core/models/policy.model';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {AsyncPipe} from '@angular/common';
import {QuotationSummaryComponent} from '../quotation-summary/quotation-summary.component';
import {NxFormfieldComponent} from '@aposin/ng-aquila/formfield';
import {NxDropdownComponent, NxDropdownItemComponent} from '@aposin/ng-aquila/dropdown';
import {SelectPlan} from '../../store/policy/policy-purchase.action';

@Component({
  selector: 'app-policy-purchase-plan-comparison-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTablePopularCell,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    AsyncPipe,
    NxButtonComponent,
    QuotationSummaryComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './policy-purchase-plan-comparison-table.component.html',
  styleUrl: './policy-purchase-plan-comparison-table.component.scss',
})
export class PolicyPurchasePlanComparisonTableComponent implements OnInit {
  @Input() nextStep!: () => void;
  @Input() prevStep!: () => void;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly store: Store = inject(Store);

  quotationDetails$!: Observable<PolicyDetails>;
  plans$: Observable<PolicyPlanDto[]> | undefined;
  selectedPlan$: Observable<PolicyPlan | undefined> | undefined;

  infoForm!: FormGroup;
  latestPlan!: PolicyPlan | undefined;

  layout?: NxComparisonTableViewType | null;

  onPlanSelect(plan: PolicyPlanDto) {
    const paymentPeriod = this.infoForm.value.paymentPeriod;

    const selectedPlan: PolicyPlan = {
      id: plan.id,
      planName: plan.planName,
      sumAssured: plan.sumAssured,
      coverageTerm: plan.coverageTerm,
      premiumAmount: paymentPeriod === 'monthly' ? plan.monthlyPremium : plan.yearlyPremium,
      premiumMode: paymentPeriod === 'monthly' ? 'MONTHLY' : 'YEARLY',
    }

    this.infoForm.patchValue({ planSelection: plan.planName });
    this.store.dispatch(new SelectPlan(selectedPlan));

  }

  onPaymentPeriodChange(newPeriod: string): void {
    this.infoForm.patchValue({ paymentPeriod: newPeriod })

    const selectedPlanName = this.infoForm.value.planSelection;

    if (selectedPlanName && this.plans$) {
      this.plans$.pipe(take(1)).subscribe(plans => {
        const matchedPlan = plans.find(p => p.planName === selectedPlanName);
        if (!matchedPlan) return;

        const updatedSelectedPlan: PolicyPlan = {
          id: matchedPlan.id,
          planName: matchedPlan.planName,
          sumAssured: matchedPlan.sumAssured,
          coverageTerm: matchedPlan.coverageTerm,
          premiumAmount: newPeriod === 'monthly' ? matchedPlan.monthlyPremium : matchedPlan.yearlyPremium,
          premiumMode: newPeriod === 'monthly' ? 'MONTHLY' : 'YEARLY',
        };

        this.store.dispatch(new SelectPlan(updatedSelectedPlan));
      });
    }
  }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      paymentPeriod: ['monthly'],
      planSelection: ['']
    });

    this.plans$ = this.store.select(PolicyPurchaseState.plans);
    this.selectedPlan$ = this.store.select(PolicyPurchaseState.selectedPlan);
    this.selectedPlan$.subscribe(plan => {
      console.log('Selected plan from state:', plan)
      this.latestPlan = plan;
      if (plan) {
        this.infoForm.patchValue({ planSelection: plan.planName });
      }
    });

    this.quotationDetails$ = this.store.select(PolicyPurchaseState.getQuotationDetails);
  }

  onSubmit(): void {
    if (!this.infoForm.value.planSelection){
      return;
    }
    this.nextStep();
  }
}
