import {inject} from '@angular/core';
import {HttpContextToken, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {User} from '../models/user.model';
import {UserState} from '../../store/user/user.state';
import {AuthService} from '@auth0/auth0-angular';
import {from, switchMap} from 'rxjs';

export const SkipUserAuthHeaders = new HttpContextToken<boolean>(() => false);

export const userAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const store = inject(Store);


  const shouldSkipHeaders = request.context.get(SkipUserAuthHeaders);
  if (shouldSkipHeaders) {
    return next(request);
  }

  const isCustomAuth: boolean = store.selectSnapshot(UserState.isLoggedIn);

  if (isCustomAuth) {
    const jwtToken: string = store.selectSnapshot(UserState.getJwtToken);
    const currentUser: User = store.selectSnapshot(UserState.getUser);

    const customHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
      'userId': currentUser.userId
    });

    return next(request.clone({ headers: customHeaders }));
  }

  return from(authService.getAccessTokenSilently()).pipe(
    switchMap((auth0Token: string) => {
      const headers: HttpHeaders = request.headers.set('Authorization', `Bearer ${auth0Token}`);
      return next(request.clone({ headers }));
    })
  );
};
