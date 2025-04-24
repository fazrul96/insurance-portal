import {Component} from '@angular/core';
import {NxTabComponent, NxTabContentDirective, NxTabGroupComponent} from '@aposin/ng-aquila/tabs';
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
import {DatePipe} from '@angular/common';

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
    NxTabContentDirective,
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
  ],
  templateUrl: './policy-servicing-new.component.html',
  styleUrl: './policy-servicing-new.component.scss'
})
export class PolicyServicingNewComponent {
  policyList: Policy[] = [
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
      policyNumber: 'G125677-000',
      benefit: 'Group Outpatient Clinical',
      effectiveDate: new Date('1/3/2020'),
      expiryDate: new Date('1/3/2020'),
      status: 'In Force',
    },
    {
      employer: 'ACCENTURE TECHNOLOGY SOLUTIONS SDN. BHD.',
      policyNumber: 'G125677-000',
      benefit: 'Group Outpatient Clinical',
      effectiveDate: new Date('1/3/2020'),
      expiryDate: new Date('1/3/2020'),
      status: 'In Force',
    }
  ];

  lifePolicyCount: number = this.policyList.length;
  generalPolicyCount: number = 0;
  employeePolicyCount: number = 0;

  sortTable(sort: SortEvent): void {
    const { active, direction } = sort;
    this.policyList.sort((a: any, b: any) =>
      this.compare(a[active], b[active], direction)
    );
  }

  private compare(a: any, b: any, direction: SortDirection): number {
    if (a < b) return direction === 'asc' ? -1 : 1;
    if (a > b) return direction === 'asc' ? 1 : -1;
    return 0;
  }
}
