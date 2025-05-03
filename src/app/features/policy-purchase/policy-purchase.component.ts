import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {CardItem, DASHBOARD_CARDS_PRODUCTS} from '../../shared/data/dashboard-cards.data';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NxInputDirective} from '@aposin/ng-aquila/input';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {Router, RouterLink} from '@angular/router';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {NxDialogService, NxModalRef} from '@aposin/ng-aquila/modal';
import {NxCardComponent, NxCardMainLinkDirective, NxCardSecondaryInfoDirective} from '@aposin/ng-aquila/card';
import {NxButtonComponent, NxIconButtonComponent} from '@aposin/ng-aquila/button';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {
  NxFormfieldAppendixDirective,
  NxFormfieldComponent,
  NxFormfieldPrefixDirective
} from '@aposin/ng-aquila/formfield';
import {NxMessageComponent} from '@aposin/ng-aquila/message';
import {NxDropdownComponent, NxDropdownItemComponent} from '@aposin/ng-aquila/dropdown';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {NxPopoverComponent, NxPopoverTriggerDirective} from '@aposin/ng-aquila/popover';
import {ROUTE_PATHS} from '../../app.routes';
import {InsuranceService} from '../../core/services/insurance.service';

@Component({
  selector: 'app-policy-purchase',
  imports: [
    FormsModule,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    NxLayoutComponent,
    NxCardComponent,
    ReactiveFormsModule,
    NxButtonComponent,
    NxHeadlineComponent,
    NxRowComponent,
    NxColComponent,
    NxCardMainLinkDirective,
    NxCardSecondaryInfoDirective,
    NxLinkComponent,
    NxFormfieldComponent,
    NxMessageComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxFormfieldAppendixDirective,
    NxFormfieldPrefixDirective,
    NxIconButtonComponent,
    NxIconComponent,
    NxInputDirective,
    NxPopoverTriggerDirective,
    NxPopoverComponent
  ],
  templateUrl: './policy-purchase.component.html',
  styleUrl: './policy-purchase.component.scss'
})
export class PolicyPurchaseComponent {
  readonly breadcrumbItems: string[] = ['Home', 'Policy Purchase'];
  readonly insuranceTypes: CardItem[] = DASHBOARD_CARDS_PRODUCTS;

  successMessage: string = '';
  selectedPolicyCard: CardItem | null = null;

  @ViewChild('templateRef') templateRef!: TemplateRef<any>;
  private templateDialogRef?: NxModalRef<any>;

  insuranceForm: FormGroup;

  private readonly insuranceService = inject(InsuranceService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogService = inject(NxDialogService);

  constructor() {
    this.insuranceForm = this.createInsuranceForm();
  }

  private createInsuranceForm(): FormGroup {
    return this.formBuilder.group({
      insuredName: this.formBuilder.control('', Validators.required),
      coverageAmt: this.formBuilder.control(10000, [Validators.required, Validators.min(10000)]),
    });
  }

  handleCardSelection(card: CardItem): void {
    this.selectedPolicyCard = card;
    this.insuranceForm.patchValue({ insuredName: card.title });
    this.openModal();
  }

  openModal(): void {
    this.templateDialogRef = this.dialogService.open(this.templateRef, {
      ariaLabel: 'Insurance Application Modal',
    });
  }

  closeModal(): void {
    this.templateDialogRef?.close();
  }

  submitForm(): void {
    if (this.insuranceForm.invalid) return;

    const { insuredName, coverageAmt } = this.insuranceForm.value;

    this.insuranceService.addPolicy({ insuredName, coverageAmt });

    this.successMessage = `🎉 Successfully purchased ${insuredName} policy with RM${coverageAmt} coverage.`;

    this.closeModal();
    this.insuranceForm.reset();
    this.selectedPolicyCard = null;

    setTimeout(() => {
      this.router.navigate([ROUTE_PATHS.policyServicing]);
    }, 1500);
  }
}
