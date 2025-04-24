import {Component, inject, Input, OnInit} from '@angular/core';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {RouterLink} from '@angular/router';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent
} from '@aposin/ng-aquila/table';
import {getPolicyStatus, getPolicyStatusColor} from '../../shared/utils/policy.utils';
import {Policy} from '../../core/models/policy.model';
import {InsuranceService} from '../../core/services/insurance.service';

@Component({
  selector: 'app-policy-servicing',
  imports: [
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent
  ],
  templateUrl: './policy-servicing.component.html',
  styleUrl: './policy-servicing.component.scss'
})
export class PolicyServicingComponent implements OnInit {
  readonly breadcrumbItems: string[] = ['Home', 'Policy Servicing'];
  readonly getPolicyStatusColor = getPolicyStatusColor;
  readonly getPolicyStatus = getPolicyStatus;
  @Input() headers: string[] = ['Policy Number', 'Insured Name', 'Coverage Amount', 'Premium', 'Status'];

  policies: Policy[] = [];
  selectedRow: Policy | null = null;
  insuranceService = inject(InsuranceService);

  ngOnInit(): void {
      this.policies = this.insuranceService.getPolicies();
  }

  selectRow(row: Policy): void {
    this.selectedRow = row;
  }
}
