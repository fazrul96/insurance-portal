import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {NxExpertModule} from '@aposin/ng-aquila/config';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideStore} from '@ngxs/store';
import {provideAuth0} from '@auth0/auth0-angular';
import {withNgxsStoragePlugin} from '@ngxs/storage-plugin';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {loggingHttpInterceptor} from './core/interceptors/logging-http.interceptor';
import {errorHandlingInterceptor} from './core/interceptors/error-handling.interceptor';
import {loadingInterceptor} from './core/interceptors/loading.interceptor';
import {UserState} from './store/user/user.state';
import {PolicyPurchaseState} from './store/policy/policy-purchase.state';
import {PolicyProductState} from './store/policy-product/policy-product.state';
import {userAuthInterceptor} from './core/interceptors/user-auth.interceptor';
import {PolicyClaimState} from './store/policy-claim/policy-claim.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        errorHandlingInterceptor,
        loadingInterceptor,
        loggingHttpInterceptor,
        // authInterceptor, // only for auth0
        userAuthInterceptor
      ])
    ),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0.authorizationParams.audience,
      }
    }),
    provideStore(
      [UserState, PolicyPurchaseState, PolicyProductState, PolicyClaimState],
      withNgxsStoragePlugin({
        keys: '*',
        storage: 1,
      }),
      withNgxsReduxDevtoolsPlugin(),
      withNgxsLoggerPlugin({ disabled: environment.production })
    ),
    importProvidersFrom(NxExpertModule),
  ]
};
