import {AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {
  NxNotificationItemContentDirective,
  NxNotificationPanelComponent,
  NxNotificationPanelItemComponent
} from '@aposin/ng-aquila/notification-panel';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {RouterLink} from '@angular/router';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbIconModule} from '@nebular/theme';
import { NbStatusService } from '@nebular/theme';
@Component({
  selector: 'app-login-notification',
  imports: [
    NxIconComponent,
    NxNotificationPanelComponent,
    NxNotificationPanelItemComponent,
    RouterLink,
    NxNotificationItemContentDirective,
    NbEvaIconsModule,
    NbIconModule
  ],
  providers: [NbStatusService],
  templateUrl: './login-notification.component.html',
  styleUrl: './login-notification.component.scss'
})
export class LoginNotificationComponent implements AfterViewInit {
  @ViewChild('notificationPanelTemplate') notificationPanelTemplate!: TemplateRef<any>;
  @Output() panelTemplate = new EventEmitter<TemplateRef<any>>();
  @Output() logoutClick = new EventEmitter<void>();

  @Input() profileLink: string = '/profile';
  @Input() profileIcon: string = 'star-o';
  @Input() logoutIcon: string = 'bell';

  onLogoutClick() {
    this.logoutClick.emit();
  }

  ngAfterViewInit() {
    this.panelTemplate.emit(this.notificationPanelTemplate);
  }
}
