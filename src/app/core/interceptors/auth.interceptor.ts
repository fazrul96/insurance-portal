import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {from, switchMap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);
  const getAuthToken = () => from(auth.getAccessTokenSilently());

  return getAuthToken().pipe(
    switchMap(token => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    })
  );
};
