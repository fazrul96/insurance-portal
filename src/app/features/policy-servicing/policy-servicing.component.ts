import { Component } from '@angular/core';
import {TableComponent} from '../../shared/components/table/table.component';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {RouterLink} from '@angular/router';
import {NxLayoutComponent} from '@aposin/ng-aquila/grid';
import {PolicyServicingNewComponent} from '../policy-servicing-new/policy-servicing-new.component';

@Component({
  selector: 'app-policy-servicing',
  imports: [
    TableComponent,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    NxLayoutComponent,
    PolicyServicingNewComponent
  ],
  templateUrl: './policy-servicing.component.html',
  styleUrl: './policy-servicing.component.scss'
})
export class PolicyServicingComponent {
  items: string[] = ['Home', 'Policy Servicing'];
}
