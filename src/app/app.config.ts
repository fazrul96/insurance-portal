import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {NxExpertModule} from '@aposin/ng-aquila/config';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';

import {routes} from './app.routes';
import {provideAuth0} from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(NxExpertModule),
    provideAuth0({
      domain: 'dev-kcm0rrkdks1wi726.us.auth0.com',
      clientId: '2XOJOYiFYCuz5hh0DCCzpt8omqbEloge',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/api/v2/',
      }
    }),
  ]
};
