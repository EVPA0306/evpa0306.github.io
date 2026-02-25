import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

declare var Stripe: any;

export interface CheckoutRequest {
  items: CheckoutItem[];
  customerEmail?: string;
}


export interface CheckoutItem {
  name: string;
  description: string;
  amount: number;          // In cents (e.g. 2000 = $20.00)
  quantity?: number;
  currency?: string;
}


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
  private backendUrl: string;
  private stripePublishableKey: string;

  constructor(private http: HttpClient) {
    // Load configuration from environment
    this.backendUrl = environment.apiBaseUrl;
    this.stripePublishableKey = environment.stripe.publishableKey;
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

  async verifyPayment(sessionId: string): Promise<any> {
    try {
      const response = await this.callBackendAPI(environment.apiEndpoints.verifyPayment, {
        sessionId}, 'GET');
      return response;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  async createCheckoutSession(product: PaymentProduct): Promise<void> {
    try {
      // In a real application, this would call your backend API
      // which creates a Stripe Checkout session and returns the session ID
      const response = await this.callBackendAPI(environment.apiEndpoints.createCheckoutSession, {
        customerEmail: 'kivcus@gmail.com',
        items: [
          {
            name: product.id,
            description: product.name,
            amount: product.price * 100, // Stripe uses cents
            currency: product.currency,
            quantity: 1
          }
        ]
      }, 'POST');

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
      const response = await this.callBackendAPI(environment.apiEndpoints.createPaymentIntent, {
        amount: product.price * 100, // Stripe uses cents
        currency: product.currency,
        productId: product.id
      });

      if (response.clientSecret) {
        // Using modern confirmPayment API instead of deprecated confirmCardPayment
        const result = await this.stripe.confirmPayment({
          elements: cardElement,
          clientSecret: response.clientSecret,
          confirmParams: {
            return_url: window.location.origin + '/payment-success'
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

  private async callBackendAPI(endpoint: string, data: any, method: 'GET' | 'POST' = 'POST'): Promise<any> {
    var url = `${this.backendUrl}${endpoint}`;

    try {
      let response: any;

      if (method === 'GET') {
        console.log(`Calling backend API: ${endpoint} [GET]`);
        url = url.replace('{sessionId}', data.sessionId); // Replace path parameter if needed
        response = await firstValueFrom(this.http.get<any>(url));
      } else {
        console.log(`Calling backend API: ${endpoint} [POST] with data:`, data);
        response = await firstValueFrom(this.http.post<any>(url, data));
      }

      return response;
    } catch (error: any) {
      console.error('Backend API error:', error);
      const errorMessage = error?.error?.message || error?.message || 'Backend API call failed';
      throw new Error(errorMessage);
    }
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
