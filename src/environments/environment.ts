// import { config } from 'common-config';

export const environment = {
  production: true,
  apiBaseUrl: 'https://spring-boot-app.mfzrl.cyou',
  apiUrl: '/api/',
  apiPrivateUrl: '/api/v1/',
  apiPublicUrl: '/api/v2/',
  auth0: {
    domain: 'dev-kcm0rrkdks1wi726.us.auth0.com',
    clientId: '2XOJOYiFYCuz5hh0DCCzpt8omqbEloge', // todo recheck why other cred not work
    authorizationParams: {
      audience: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/api/v2/',
    }
  }
};
