import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {NxExpertModule} from '@aposin/ng-aquila/config';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {routes} from './app.routes';
import {provideAuth0} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {loggingHttpInterceptor} from './core/interceptors/logging-http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([authInterceptor, loggingHttpInterceptor])
    ),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0.authorizationParams.audience,
      }
    }),
    importProvidersFrom(NxExpertModule),
  ]
};
