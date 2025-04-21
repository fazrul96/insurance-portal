import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NxBadgeComponent} from '@aposin/ng-aquila/badge';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@aposin/ng-aquila/table';
import {InsuranceService} from '../../../core/services/insurance.service';
import {Policy} from '../../../core/models/policy.model';
import {PolicyStatus} from '../../utils/enum-policy-status';

@Component({
  selector: 'app-table',
  imports: [
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxLinkComponent,
    RouterLink,
    NxBadgeComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {
  policies: Policy[] = [];
  tableElements: Policy[] = [];
  selectedRow: Policy | null = null;

  @Input() headers: string[] = ['Policy Number', 'Insured Name', 'Coverage Amount', 'Premium', 'Status'];

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.policies = this.insuranceService.getPolicies();
    this.tableElements = this.policies;
  }

  selectRow(row: Policy): void {
    this.selectedRow = row;
  }

  getStatusColor(status: PolicyStatus): string {
    switch (status) {
      case PolicyStatus.Active:
        return 'green';
      case PolicyStatus.Cancelled:
        return 'red';
      case PolicyStatus.PendingApproval:
        return 'orange';
      default:
        return 'black';
    }
  }

  getPolicyStatus(status: string): PolicyStatus {
    return status as PolicyStatus;
  }
}
