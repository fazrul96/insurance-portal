import {Component} from '@angular/core';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {RouterLink} from '@angular/router';
import {NxLayoutComponent} from '@aposin/ng-aquila/grid';

@Component({
  selector: 'app-claim-management',
  imports: [
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    NxLayoutComponent
  ],
  templateUrl: './claim-management.component.html',
  styleUrl: './claim-management.component.scss'
})
export class ClaimManagementComponent {
  items: string[] = ['Home', 'Claim Management'];
}
