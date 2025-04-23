import { Component } from '@angular/core';
import {TableComponent} from '../../shared/components/table/table.component';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {RouterLink} from '@angular/router';
import {NxLayoutComponent} from '@aposin/ng-aquila/grid';

@Component({
  selector: 'app-policy-servicing',
  imports: [
    TableComponent,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    NxLayoutComponent
  ],
  templateUrl: './policy-servicing.component.html',
  styleUrl: './policy-servicing.component.scss'
})
export class PolicyServicingComponent {
  items: string[] = ['Home', 'Policy Servicing'];
}
