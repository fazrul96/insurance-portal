import {Component, OnInit,} from '@angular/core';
import {NxButtonComponent} from '@aposin/ng-aquila/button';
import {NxHeaderActionsDirective, NxHeaderBrandDirective, NxHeaderComponent,} from '@aposin/ng-aquila/header';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {AuthService} from '@auth0/auth0-angular';
import {UserDetail} from '../../core/models/user-detail.model';

@Component({
  selector: 'app-header',
  imports: [
    NxHeaderComponent,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderActionsDirective,
    NxButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}
  isAuthenticated = false;
  // userInfo: UserDetail | null = null;

    ngOnInit(): void {
      this.auth.isAuthenticated$.subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      });

      // this.auth.user$.subscribe((user) => {
      //   if (user) {
      //     this.userInfo = {
      //       fullName: user.name,
      //       shortName: user.nickname,
      //       email: user.email || '',
      //       picture: user.picture,
      //     };
      //   }
      // });
    }
}
