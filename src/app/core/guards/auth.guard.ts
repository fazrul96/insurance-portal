import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree,} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {map, Observable} from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuthenticated) =>
      isAuthenticated ? true : router.createUrlTree(['/'])
    )
  );
};
