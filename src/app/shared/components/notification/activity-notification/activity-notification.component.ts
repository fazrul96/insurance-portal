import { Component } from '@angular/core';
import {NxCopytextComponent} from '@aposin/ng-aquila/copytext';
import {NxIconButtonComponent, NxPlainButtonComponent} from '@aposin/ng-aquila/button';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {
  NxNotificationItemContentDirective,
  NxNotificationItemHeaderDirective,
  NxNotificationItemMetadataDirective,
  NxNotificationPanelComponent,
  NxNotificationPanelItemComponent, NxNotificationPanelTriggerDirective
} from '@aposin/ng-aquila/notification-panel';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-activity-notification',
  imports: [
    NxCopytextComponent,
    NxIconButtonComponent,
    NxIconComponent,
    NxNotificationItemContentDirective,
    NxNotificationItemHeaderDirective,
    NxNotificationItemMetadataDirective,
    NxNotificationPanelComponent,
    NxNotificationPanelItemComponent,
    NxPlainButtonComponent,
    RouterLink,
    NxNotificationPanelTriggerDirective
  ],
  templateUrl: './activity-notification.component.html',
  styleUrl: './activity-notification.component.scss'
})
export class ActivityNotificationComponent {

}
