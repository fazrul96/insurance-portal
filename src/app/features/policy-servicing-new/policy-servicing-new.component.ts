import {Component} from '@angular/core';
import {NxTabComponent, NxTabGroupComponent} from '@aposin/ng-aquila/tabs';
import {
  NxHeaderCellDirective,
  NxSortDirective,
  NxSortHeaderComponent,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
  SortDirection,
  SortEvent
} from '@aposin/ng-aquila/table';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {RouterLink} from '@angular/router';
import {NxBadgeComponent} from '@aposin/ng-aquila/badge';
import {DatePipe, NgClass} from '@angular/common';

interface Policy {
  employer: string;
  policyNumber: string;
  benefit: string;
  effectiveDate: Date;
  expiryDate: Date;
  status: string;
}

@Component({
  selector: 'app-policy-servicing-new',
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxTableComponent,
    NxSortDirective,
    NxTableRowComponent,
    NxSortHeaderComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxLinkComponent,
    RouterLink,
    NxBadgeComponent,
    DatePipe,
    NgClass,

  ],
  templateUrl: './policy-servicing-new.component.html',
  styleUrl: './policy-servicing-new.component.scss'
})
export class PolicyServicingNewComponent {
  lifePolicyList: never[] = [];
  generalPolicyList: never[] = [];
  employeePolicyList: Policy[] = [
    {
      employer: 'ACCENTURE TECHNOLOGY SOLUTIONS SDN. BHD.',
      policyNumber: 'G125677-000',
      benefit: 'Group Outpatient Clinical',
      effectiveDate: new Date('1/3/2020'),
      expiryDate: new Date('1/3/2020'),
      status: 'In Force',
    },
    {
      employer: 'ACCENTURE TECHNOLOGY SOLUTIONS SDN. BHD.',
      policyNumber: 'G125728-000',
      benefit: 'Group Hospitalisation & Surgical',
      effectiveDate: new Date('1/3/2020'),
      expiryDate: new Date('1/3/2020'),
      status: 'In Force',
    },
    {
      employer: 'ACCENTURE TECHNOLOGY SOLUTIONS SDN. BHD.',
      policyNumber: 'G125828-000',
      benefit: 'Group Term Life',
      effectiveDate: new Date('1/3/2020'),
      expiryDate: new Date('1/3/2020'),
      status: 'In Force',
    }
  ];

  lifePolicyCount: number = this.lifePolicyList.length;
  generalPolicyCount: number = this.generalPolicyList.length;
  employeePolicyCount: number = this.employeePolicyList.length;

  sortTable(sort: SortEvent): void {
    const { active, direction } = sort;
    this.employeePolicyList.sort((a: any, b: any) =>
      this.compare(a[active], b[active], direction)
    );
  }

  private compare(a: any, b: any, direction: SortDirection): number {
    if (a < b) return direction === 'asc' ? -1 : 1;
    if (a > b) return direction === 'asc' ? 1 : -1;
    return 0;
  }
}
