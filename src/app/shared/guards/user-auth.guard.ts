import {inject} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {CanActivateFn, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthService} from '@auth0/auth0-angular';
import {UserState} from '../../store/user/user.state';

export const userAuthGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const store = inject(Store);
  const router = inject(Router);

  const isCustomLoggedIn = store.selectSnapshot(UserState.isLoggedIn);
  const isAuth0LoggedIn = await firstValueFrom(auth.isAuthenticated$);

  if (isCustomLoggedIn || isAuth0LoggedIn) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
