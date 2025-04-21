import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {NxExpertModule} from '@aposin/ng-aquila/config';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {OKTA_CONFIG} from '@okta/okta-angular';

import {routes} from './app.routes';
import {oktaAuth} from './core/auth/okta-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NxExpertModule),
    provideAnimations(),
    provideHttpClient(),
    { provide: OKTA_CONFIG, useValue: { oktaAuth } }
  ]
};
