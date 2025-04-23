// import { config } from 'common-config';

export const environment = {
  production: false,
  // apiUrl: config.apiUrl,
  auth0: {
    domain: 'dev-kcm0rrkdks1wi726.us.auth0.com',
    clientId: '2XOJOYiFYCuz5hh0DCCzpt8omqbEloge', // todo recheck why other cred not work
    authorizationParams: {
      audience: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/api/v2/',
    }
  }
};
