import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NxActionComponent, NxActionIconDirective,} from '@aposin/ng-aquila/action';
import {NxIconButtonComponent} from '@aposin/ng-aquila/button';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {NxSidebarComponent, NxSidebarFooterComponent, NxSidebarToggleComponent,} from '@aposin/ng-aquila/sidebar';
import {NxTooltipDirective} from '@aposin/ng-aquila/tooltip';
import {ROUTE_PATHS} from '../../app.routes';

@Component({
  selector: 'app-sidebar',
  imports: [
    NxSidebarComponent,
    NxActionComponent,
    RouterLink,
    RouterLinkActive,
    NxIconComponent,
    NxActionIconDirective,
    NxSidebarFooterComponent,
    NxIconButtonComponent,
    NxSidebarToggleComponent,
    NxTooltipDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  actions = [
    {
      icon: 'file-text',
      label: 'Dashboard',
      route: [ROUTE_PATHS.root]
    },
    {
      icon: 'calendar',
      label: 'Policy Purchase',
      route: [ROUTE_PATHS.policyPurchase],
      // children: [
      //   {
      //     icon: 'file-text',
      //     label: 'Policy Purchase',
      //     route: '/policy/policy-purchase'
      //   },
      //   {
      //     icon: 'calendar',
      //     label: 'Policy Servicing',
      //     route: '/policy/policy-servicing'
      //   },
      //   {
      //     icon: 'file-check',
      //     label: 'Claim Management',
      //     route: '/policy/claim-management'
      //   }
      // ]
    },
    {
      icon: 'calendar',
      label: 'Policy Servicing',
      route: [ROUTE_PATHS.policyServicing]
    },
    {
      icon: 'calendar',
      label: 'Claim Management',
      route: [ROUTE_PATHS.claimManagement]
    }
  ];
}
