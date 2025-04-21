import {OktaAuth, OktaAuthOptions} from '@okta/okta-auth-js';

export const oktaAuthConfig: OktaAuthOptions = {
  issuer: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/oauth2/default',
  clientId: 'SWi3PPArj7qVBRSCsudK2wFXp9LFGQmS',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
};

export const oktaAuth = new OktaAuth(oktaAuthConfig);
