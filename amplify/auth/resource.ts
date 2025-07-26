import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['openid', 'email', 'profile'],
        attributeMapping: {
          email: 'email',
        }
      },
      callbackUrls: [
        'http://localhost:3000/',
        'https://aws-port.d3kdxwjozhszzs.amplifyapp.com',
        'https://myrenta.org/'
      ],
      logoutUrls: [
        'http://localhost:3000/',
        'https://aws-port.d3kdxwjozhszzs.amplifyapp.com',
        'https://myrenta.org/'
      ]
    }
  }
});