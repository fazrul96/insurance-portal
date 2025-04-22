import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {UserDetail} from "../../../core/models/user-detail.model";

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent implements OnInit {
  constructor(public auth: AuthService) {}
  isAuthenticated = false;
  userInfo: UserDetail | null = null;

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });

    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userInfo = {
          fullName: user.name,
          shortName: user.nickname,
          email: user.email || '',
          picture: user.picture,
        };
      }
    });
  }
}
