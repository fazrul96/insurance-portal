import {Component, inject, Input, OnInit} from '@angular/core';
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
import {getPolicyStatus, getPolicyStatusColor} from '../../utils/policy.utils';
import {NxColComponent, NxLayoutComponent} from '@aposin/ng-aquila/grid';
import {NxCardComponent, NxCardMainLinkDirective, NxCardSecondaryInfoDirective} from '@aposin/ng-aquila/card';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';

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
    NxLayoutComponent,
    NxColComponent,
    NxCardComponent,
    NxCardMainLinkDirective,
    NxCardSecondaryInfoDirective,
    NxHeadlineComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {
  policies: Policy[] = [];
  selectedRow: Policy | null = null;
  insuranceService = inject(InsuranceService);
  @Input() headers: string[] = ['Policy Number', 'Insured Name', 'Coverage Amount', 'Premium', 'Status'];

  ngOnInit(): void {
    this.policies = this.insuranceService.getPolicies();
  }

  selectRow(row: Policy): void {
    this.selectedRow = row;
  }

  protected readonly getPolicyStatusColor = getPolicyStatusColor;
  protected readonly getPolicyStatus = getPolicyStatus;
}
