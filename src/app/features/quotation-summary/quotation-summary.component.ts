import {CommonModule} from '@angular/common';
import {Component, inject, Input, OnChanges, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {PolicyDetails} from '../../core/models/policy.model';
import {formatCamelCase, formatPremium} from '../../shared/utils/string-utils';
import {NxCardComponent} from '@aposin/ng-aquila/card';
import {PolicyPurchaseState} from '../../store/policy/policy-purchase.state';

@Component({
  selector: 'app-quotation-summary',
  imports: [CommonModule, NxCardComponent],
  templateUrl: './quotation-summary.component.html',
  styleUrl: './quotation-summary.component.scss'
})
export class QuotationSummaryComponent implements OnInit, OnChanges {
  @Input() quotation: PolicyDetails | null = null;
  @Input() paymentMode: string = '';

  store: Store = inject(Store);
  quotationSummaryRows: { title: string; desc: string }[] = [];
  premiumSummary: { title: string; desc: string } | null = null;
  disabled: boolean = true;

  ngOnInit(): void {
    if (!this.quotation) {
      this.quotation = this.store.selectSnapshot(PolicyPurchaseState.getQuotationDetails);
      this.ngOnChanges();
    }
  }

  ngOnChanges(): void {
    if (!this.quotation) return;

    const mode = this.quotation.plan?.premiumMode ?? this.paymentMode;

    this.quotationSummaryRows = [
      {title: 'Reference Number', desc: this.quotation.quotationNumber ?? '—'},
      {title: 'Gender', desc: this.quotation.personalDetails?.gender ?? '—'},
      {title: 'Date of Birth', desc: this.quotation.personalDetails?.dateOfBirth ?? '—'},
      {title: 'Age Nearest Birthday', desc: this.quotation.personalDetails?.age?.toString() ?? '—'},
      {title: 'Selected Plan', desc: this.quotation.plan?.planName ?? '—'},
      {title: 'Premium Mode', desc: formatCamelCase(mode) ?? '—'},
      {title: 'Coverage Term', desc: this.quotation.plan?.coverageTerm ?? '—'},
    ];

    this.premiumSummary = {
      title: 'Premium Payable',
      desc: formatPremium(this.quotation.plan?.premiumAmount, mode)
    };
  }
}
