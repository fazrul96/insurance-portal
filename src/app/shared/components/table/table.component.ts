import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NxBadgeComponent} from '@aposin/ng-aquila/badge';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@aposin/ng-aquila/table';
import {TABLE_POLICY, TablePolicy} from '../../data/table-policy-elements.data';

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
export class TableComponent {
  tableElements: TablePolicy[] = TABLE_POLICY;
}
