// Development environment configuration
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081',
  apiEndpoints: {
    createCheckoutSession: '/api/payment/create-checkout-session',
    createPaymentIntent: '/api/payment/create-payment-intent',
    getCheckoutSession: '/api/payment/checkout-session',
    verifyPayment: '/api/payment/session/{sessionId}'
  },
  stripe: {
    publishableKey: 'pk_test_51T2kml2Q4szU1xK8TpJbYowOtnotgnwahoMT06RWwQd57QHksOmFyGUnKTceWeS4KhZZOWtl14WxUbUxz4zk752F00cc9TGkQH'
  }
};

