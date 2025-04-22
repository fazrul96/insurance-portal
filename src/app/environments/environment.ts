// import { config } from 'common-config';
import {provideAuth0} from '@auth0/auth0-angular';

export const environment = {
  production: false,
  // apiUrl: config.apiUrl,
  auth0: {
    domain: 'dev-kcm0rrkdks1wi726.us.auth0.com',
    clientId: 'SWi3PPArj7qVBRSCsudK2wFXp9LFGQmS',
    authorizationParams: {
      audience: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/api/v2/',
    }
  }
};
