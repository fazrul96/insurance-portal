import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {NxButtonComponent, NxPlainButtonComponent} from '@aposin/ng-aquila/button';
import {
  NxHeaderActionsDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
  NxHeaderLinkComponent,
  NxHeaderNavigationComponent,
  NxHeaderNavigationItemDirective,
  NxHeaderRowDirective,
} from '@aposin/ng-aquila/header';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {AuthService} from '@auth0/auth0-angular';
import {NxBreakpoints, NxViewportService} from '@aposin/ng-aquila/utils';
import {distinctUntilChanged, filter, map, merge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NxMenuButtonComponent, NxMenuComponent, NxMenuItemDirective} from '@aposin/ng-aquila/menu';
import {NxIconComponent, NxStatusIconComponent} from '@aposin/ng-aquila/icon';
import {NxFigureComponent} from '@aposin/ng-aquila/image';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DatePipe} from '@angular/common';
import {
  LoginNotificationComponent
} from '../../shared/components/notification/login-notification/login-notification.component';
import {NxNotificationPanelTriggerDirective} from '@aposin/ng-aquila/notification-panel';

type ViewType = 'mobile' | 'tablet' | 'desktop';

interface MenuItem {
  label: string;
  link: string
}

@Component({
  selector: 'app-header',
  imports: [
    NxHeaderComponent,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderActionsDirective,
    NxButtonComponent,
    NxMenuComponent,
    NxIconComponent,
    NxPlainButtonComponent,
    NxFigureComponent,
    NxMenuButtonComponent,
    NxMenuItemDirective,
    RouterLink,
    NxHeaderRowDirective,
    DatePipe,
    NxHeaderLinkComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    RouterLinkActive,
    LoginNotificationComponent,
    NxNotificationPanelTriggerDirective,
    NxStatusIconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(NxMenuComponent) menu!: NxMenuComponent;
  notificationPanelTemplate!: TemplateRef<any>;

  readonly auth: AuthService = inject(AuthService);
  private readonly viewportService: NxViewportService = inject(NxViewportService)
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  protected readonly _destroyed = new Subject<void>();

  userInfo = null;
  isAuthenticated: boolean = false;
  userFullName: string | undefined = '';
  lastLogin: Date = new Date();
  menuData: MenuItem[] = this.getMenuItems();

  viewType: ViewType = 'desktop';
  isDesktop: boolean = this.viewType === 'desktop';
  isMobile: boolean = this.viewType === 'mobile' || this.viewType === 'tablet';

  ngOnInit(): void {
    this.detectScreenSize();
    this.subscribeToAuthService();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  subscribeToAuthService(): void {
    this.auth.isAuthenticated$.subscribe(isAuth => this.isAuthenticated = isAuth);
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.setUserInfo(user);
      }
    });
  }

  detectScreenSize(): void {
    const mobile$ = this.viewportService.max(
      NxBreakpoints.BREAKPOINT_MEDIUM,
    );
    const tablet$ = this.viewportService.between(
      NxBreakpoints.BREAKPOINT_MEDIUM,
      NxBreakpoints.BREAKPOINT_LARGE,
    );
    const desktop$ = this.viewportService.min(
      NxBreakpoints.BREAKPOINT_LARGE,
    );

    merge(
      mobile$.pipe(
        filter(value => value),
        map(() => 'mobile' as ViewType),
      ),
      tablet$.pipe(
        filter(value => value),
        map(() => 'tablet' as ViewType),
      ),
      desktop$.pipe(
        filter(value => value),
        map(() => 'desktop' as ViewType),
      ),
    )
      .pipe(distinctUntilChanged(), takeUntil(this._destroyed))
      .subscribe(viewType => {
        if (
          (viewType === 'tablet' || viewType === 'desktop') &&
          this.menu.open
        ) {
          this.menu.toggle();
        }
        this.viewType = viewType;
        this._cdr.markForCheck();
      });
  }

  setUserInfo(user: any): void {
    // this.userInfo = {
    //   fullName: user.name,
    //   shortName: user.nickname,
    //   email: user.email || '',
    //   picture: user.picture,
    // };
    // this.userFullName = this.userInfo.fullName;
    this.userFullName = "user full name";
    // todo recheck this part
  }

  get userInitials(): string {
    const name = this.userFullName || '';
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();

    return initials || 'NA';
  }

  getMenuItems(): MenuItem[] {
    return [
      { label: 'Dashboard', link: '/dashboard' },
      { label: 'Policies', link: '/policies' },
      { label: 'Allianz We Care Community', link: '#' },
      { label: 'Health Services', link: '#' },
      { label: 'Allianz Panels', link: '#' },
    ];
  }
}
