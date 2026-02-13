import { Injectable } from '@angular/core';

declare var Stripe: any;

export interface PaymentProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  sessions?: number;
  duration?: string;
  popular?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripe: any;
  
  // Replace with your actual Stripe publishable key
  private stripePublishableKey = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE';

  constructor() {
    this.loadStripe();
  }

  private loadStripe() {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        this.stripe = Stripe(this.stripePublishableKey);
      };
      document.body.appendChild(script);
    }
  }

  async createCheckoutSession(product: PaymentProduct): Promise<void> {
    try {
      // In a real application, this would call your backend API
      // which creates a Stripe Checkout session and returns the session ID
      const response = await this.callBackendAPI('/api/create-checkout-session', {
        productId: product.id,
        productName: product.name,
        price: product.price,
        currency: product.currency
      });

      if (response.sessionId && this.stripe) {
        // Redirect to Stripe Checkout
        const result = await this.stripe.redirectToCheckout({
          sessionId: response.sessionId
        });

        if (result.error) {
          console.error('Stripe checkout error:', result.error);
          throw new Error(result.error.message);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  }

  async processPayment(product: PaymentProduct, cardElement: any): Promise<any> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      // In a real application, this would:
      // 1. Call your backend to create a payment intent
      // 2. Confirm the payment with the card details
      const response = await this.callBackendAPI('/api/create-payment-intent', {
        amount: product.price * 100, // Stripe uses cents
        currency: product.currency,
        productId: product.id
      });

      if (response.clientSecret) {
        const result = await this.stripe.confirmCardPayment(response.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Customer Name' // Should come from form
            }
          }
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        return result.paymentIntent;
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  private async callBackendAPI(endpoint: string, data: any): Promise<any> {
    // DEMO MODE: Return mock data
    // In production, replace this with actual HTTP calls to your backend
    console.log('Demo Mode - Would call:', endpoint, data);
    
    if (endpoint === '/api/create-checkout-session') {
      // Simulate backend response with demo session ID
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            sessionId: 'cs_test_demo_session_id'
          });
        }, 500);
      });
    }

    if (endpoint === '/api/create-payment-intent') {
      // Simulate backend response with demo client secret
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            clientSecret: 'pi_test_demo_client_secret'
          });
        }, 500);
      });
    }

    throw new Error('Backend API not implemented in demo mode');
  }

  // PayPal Integration Methods
  async createPayPalOrder(product: PaymentProduct): Promise<any> {
    try {
      const response = await this.callBackendAPI('/api/paypal/create-order', {
        productId: product.id,
        amount: product.price,
        currency: product.currency
      });

      return response.orderId;
    } catch (error) {
      console.error('PayPal order creation error:', error);
      throw error;
    }
  }

  async capturePayPalOrder(orderId: string): Promise<any> {
    try {
      const response = await this.callBackendAPI('/api/paypal/capture-order', {
        orderId
      });

      return response;
    } catch (error) {
      console.error('PayPal capture error:', error);
      throw error;
    }
  }

  // Get available payment products/packages
  getPaymentProducts(): PaymentProduct[] {
    return [
      {
        id: 'single-session',
        name: 'Single Session',
        description: 'One training session with a professional coach',
        price: 75,
        currency: 'USD',
        sessions: 1,
        duration: '60 minutes'
      },
      {
        id: 'starter-pack',
        name: 'Starter Pack',
        description: 'Perfect for getting started with personalized training',
        price: 349,
        currency: 'USD',
        sessions: 5,
        duration: '60 minutes each'
      },
      {
        id: 'performance-pack',
        name: 'Performance Pack',
        description: 'Comprehensive training program for serious athletes',
        price: 649,
        currency: 'USD',
        sessions: 10,
        duration: '60 minutes each',
        popular: true
      },
      {
        id: 'elite-pack',
        name: 'Elite Pack',
        description: 'Maximum results with our most intensive program',
        price: 1199,
        currency: 'USD',
        sessions: 20,
        duration: '60 minutes each'
      },
      {
        id: 'monthly-unlimited',
        name: 'Monthly Unlimited',
        description: 'Unlimited training sessions for one month',
        price: 599,
        currency: 'USD',
        duration: '30 days'
      }
    ];
  }
}
