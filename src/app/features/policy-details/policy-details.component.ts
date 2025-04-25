import {Component} from '@angular/core';
import {NxTabComponent, NxTabGroupComponent} from '@aposin/ng-aquila/tabs';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {RouterLink} from '@angular/router';
import {NxBadgeComponent} from '@aposin/ng-aquila/badge';
import {NxCardComponent, NxCardMainLinkDirective, NxCardSecondaryInfoDirective} from '@aposin/ng-aquila/card';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';

interface Breadcrumb {
  label: string;
  link?: string;
}

interface PolicyDisplayItem {
  label: string;
  value: string;
}

interface PolicyDetails {
  companyName: string;
  subCompany: string;
  status: string;
}

@Component({
  selector: 'app-policy-details',
  imports: [
    NxTabComponent,
    NxTabGroupComponent,
    NxLayoutComponent,
    NxColComponent,
    NxRowComponent,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    NxBadgeComponent,
    RouterLink,
    NxCardComponent,
    NxHeadlineComponent,
    NxCardMainLinkDirective,
    NxCardSecondaryInfoDirective,

  ],
  templateUrl: './policy-details.component.html',
  styleUrl: './policy-details.component.scss'
})
export class PolicyDetailsComponent {
  currentIndex = 0;

  breadcrumbs: Breadcrumb[] = [
    { label: 'Policies', link: '/policies' },
    { label: 'ACCENTURE TECHNOLOGY SOLUTIONS SDN. BHD.', link: '#' }
  ];

  policyDetails: PolicyDetails = {
    companyName: 'Accenture Technology Solutions Sdn. Bhd.',
    subCompany: 'Accenture Solutions Sdn. Bhd.',
    status: 'In Force'
  };

  firstRow: PolicyDisplayItem[] = [
    { label: 'Policy no.', value: 'G122222-000' },
    { label: 'Effective date', value: '01 Sep 2024' },
    { label: 'Expiry Date', value: '31 Aug 2025' },
    { label: 'NRIC', value: '900000-10-1001' }
  ];

  secondRow: PolicyDisplayItem[] = [
    { label: 'Insured name', value: 'CAPITAL NAME' },
    { label: 'Facility', value: 'Managed Care Free' },
    { label: 'Dependents', value: '2' }
  ];

  cardFields = [
    { label: 'Corporate/Subsidiary Name', value: 'ACCENTURE TECHNOLOGY SOLUTIONS SDN. BHD.' },
    { label: 'Employee Name', value: 'JOHN DOE' },
    { label: 'Insured Name', value: 'JOHN DOE' },
    { label: 'Insured NRIC', value: '900516-10-1000' }
  ];
}
