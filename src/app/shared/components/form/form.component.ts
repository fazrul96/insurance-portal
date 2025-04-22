import {Component, inject, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NxButtonComponent, NxIconButtonComponent} from '@aposin/ng-aquila/button';
import {NxNativeDateModule,} from '@aposin/ng-aquila/datefield';
import {NxDropdownComponent, NxDropdownItemComponent,} from '@aposin/ng-aquila/dropdown';
import {
  NxFormfieldAppendixDirective,
  NxFormfieldComponent,
  NxFormfieldPrefixDirective,
} from '@aposin/ng-aquila/formfield';
import {NxColComponent, NxLayoutComponent, NxRowComponent,} from '@aposin/ng-aquila/grid';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {NxInputDirective} from '@aposin/ng-aquila/input';
import {NxPopoverComponent, NxPopoverTriggerDirective,} from '@aposin/ng-aquila/popover';
import {CardItem, DASHBOARD_CARDS_PRODUCTS} from '../../data/dashboard-cards.data';
import {InsuranceService} from '../../../core/services/insurance.service';
import {Router} from '@angular/router';
import {ROUTE_PATHS} from '../../../app.routes';
import {NxMessageComponent} from '@aposin/ng-aquila/message';
import {NxCardComponent, NxCardMainLinkDirective, NxCardSecondaryInfoDirective} from '@aposin/ng-aquila/card';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';
import {NxLinkComponent} from '@aposin/ng-aquila/link';

@Component({
  selector: 'app-form',
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldPrefixDirective,
    NxIconComponent,
    NxFormfieldAppendixDirective,
    NxDropdownComponent,
    NxDropdownItemComponent,
    FormsModule,
    NxIconButtonComponent,
    NxPopoverComponent,
    NxPopoverTriggerDirective,
    NxNativeDateModule,
    NxButtonComponent,
    NxMessageComponent,
    NxCardComponent,
    NxCardMainLinkDirective,
    NxCardSecondaryInfoDirective,
    NxHeadlineComponent,
    NxLinkComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @ViewChild('inputToCount', { read: NxInputDirective, static: true })
  input!: NxInputDirective;

  insuranceTypes: CardItem[] = DASHBOARD_CARDS_PRODUCTS
  selectedInsurance = '';
  coverageAmt: number = 0;
  successMessage: string = '';

  insuranceService = inject(InsuranceService);
  router = inject(Router);

  submitForm() {
    if (!this.selectedInsurance || !this.coverageAmt) {
      console.warn('Please select insurance and enter a valid coverage amount.');
      return;
    }

    this.insuranceService.addPolicy({
      insuredName: this.selectedInsurance,
      coverageAmt: this.coverageAmt
    });

    console.log('✅ Policy added!', this.insuranceService.getPolicies());
    this.successMessage = '✅ Purchase of policy is successful!';

    this.resetForm();
    setTimeout(() => {
      this.router.navigate([ROUTE_PATHS.policyServicing]);
    }, 1500);
  }

  resetForm(): void {
    this.selectedInsurance = '';
    this.coverageAmt = 0;
  }
}
