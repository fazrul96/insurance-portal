import {Component, inject, OnDestroy, OnInit, signal, Signal} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {Store} from '@ngxs/store';
import {Subject, takeUntil} from 'rxjs';
import {routes} from './app.routes';
import {UserState} from './store/user/user.state';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {SiteHeaderComponent} from './layout/site-header/site-header.component';
import {SiteFooterComponent} from './layout/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    SiteHeaderComponent,
    SiteFooterComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  showSiteHeader: boolean = false;
  showSiteFooter: boolean = true;
  isLoggedIn: Signal<boolean> = signal(false);

  private appRoutes = routes;
  private router = inject(Router);
  private store = inject(Store);
  private unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.routesListener();
    this.isLoggedIn = this.store.selectSignal(UserState.isLoggedIn);
  }

  private routesListener(): void {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (!event.urlAfterRedirects.includes('login')) {
            this.showSiteHeader = true;
          } else {
            this.showSiteHeader = false;
          }

          if (!this.appRoutes.find((route) =>
            event.urlAfterRedirects.includes(route.path ? route.path : '') && route.path !== ''
          )) {
            this.showSiteHeader = false;
            this.showSiteFooter = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}
