// Production environment configuration
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.yourdomain.com',  // Update with your production backend URL
  apiEndpoints: {
    createCheckoutSession: '/api/create-checkout-session',
    createPaymentIntent: '/api/create-payment-intent',
    getCheckoutSession: '/api/checkout-session'
  },
  stripe: {
    publishableKey: 'pk_live_...'  // Update with your production Stripe publishable key
  }
};

