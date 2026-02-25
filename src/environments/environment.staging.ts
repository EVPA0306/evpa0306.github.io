// Staging environment configuration
export const environment = {
  production: false,
  apiBaseUrl: 'https://staging-api.yourdomain.com',  // Update with your staging backend URL
  apiEndpoints: {
    createCheckoutSession: '/api/create-checkout-session',
    createPaymentIntent: '/api/create-payment-intent',
    getCheckoutSession: '/api/checkout-session'
  },
  stripe: {
    publishableKey: 'pk_test_51T2kml2Q4szU1xK8TpJbYowOtnotgnwahoMT06RWwQd57QHksOmFyGUnKTceWeS4KhZZOWtl14WxUbUxz4zk752F00cc9TGkQH'  // Use staging key
  }
};

