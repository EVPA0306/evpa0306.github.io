# Payment Integration Guide

## Overview

The Sport Center app now includes a complete payment system with support for:
- **Stripe** - Credit/Debit card payments
- **PayPal** - PayPal payments

## Features Added

### 1. Pricing Page (`/pricing`)
- Display of training packages with prices
- Package comparison
- Savings calculations
- Secure payment modal
- Payment method selection
- Success/error handling

### 2. Payment Service
- Stripe integration
- PayPal integration
- Backend API communication
- Error handling
- Security best practices

## Current Status: DEMO MODE

The payment system is currently in **DEMO MODE**. This means:
- ✅ All UI components are fully functional
- ✅ Payment flow works end-to-end
- ⚠️ No actual charges are processed
- ⚠️ Backend API calls are simulated

## Setup for Production

### Step 1: Get API Keys

#### Stripe Setup
1. Create account at https://stripe.com
2. Get your keys from Dashboard → Developers → API Keys
   - **Publishable Key**: `pk_live_...` (for frontend)
   - **Secret Key**: `sk_live_...` (for backend - keep secure!)

#### PayPal Setup
1. Create account at https://developer.paypal.com
2. Create an app in Dashboard
3. Get your credentials:
   - **Client ID** (for frontend)
   - **Secret** (for backend - keep secure!)

### Step 2: Update Frontend

Edit `/src/app/services/payment.service.ts`:

```typescript
// Replace this line:
private stripePublishableKey = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE';

// With your actual key:
private stripePublishableKey = 'pk_live_YOUR_ACTUAL_KEY';
```

### Step 3: Create Backend API

You need a backend server to handle payments securely. Here's what it needs:

#### Required Endpoints:

**1. Create Stripe Checkout Session**
```
POST /api/create-checkout-session
Body: { productId, productName, price, currency }
Returns: { sessionId }
```

**2. Create Stripe Payment Intent**
```
POST /api/create-payment-intent
Body: { amount, currency, productId }
Returns: { clientSecret }
```

**3. Create PayPal Order**
```
POST /api/paypal/create-order
Body: { productId, amount, currency }
Returns: { orderId }
```

**4. Capture PayPal Order**
```
POST /api/paypal/capture-order
Body: { orderId }
Returns: { status, details }
```

### Step 4: Update Service API Calls

Edit `/src/app/services/payment.service.ts`:

Replace the `callBackendAPI` method with actual HTTP calls:

```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {
  this.loadStripe();
}

private async callBackendAPI(endpoint: string, data: any): Promise<any> {
  const apiUrl = 'https://your-backend-domain.com'; // Your backend URL
  
  try {
    const response = await this.http.post(
      `${apiUrl}${endpoint}`,
      data
    ).toPromise();
    
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## Backend Implementation Examples

### Node.js/Express Backend

```javascript
const express = require('express');
const stripe = require('stripe')('sk_live_YOUR_SECRET_KEY');
const app = express();

app.use(express.json());

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  const { productId, productName, price, currency } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: productName,
          },
          unit_amount: price * 100, // Convert to cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://epavlenko.dev/payment-success',
      cancel_url: 'https://epavlenko.dev/pricing',
    });
    
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stripe Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency.toLowerCase(),
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### PayPal Backend

```javascript
const paypal = require('@paypal/checkout-server-sdk');

// PayPal environment setup
const environment = new paypal.core.LiveEnvironment(
  'YOUR_CLIENT_ID',
  'YOUR_SECRET'
);
const client = new paypal.core.PayPalHttpClient(environment);

// Create Order
app.post('/api/paypal/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: currency,
        value: amount.toString()
      }
    }]
  });
  
  try {
    const order = await client.execute(request);
    res.json({ orderId: order.result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Capture Order
app.post('/api/paypal/capture-order', async (req, res) => {
  const { orderId } = req.body;
  
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  
  try {
    const capture = await client.execute(request);
    res.json({ status: 'success', details: capture.result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Security Best Practices

### ✅ DO:
- Store API secret keys on backend only
- Use HTTPS for all communications
- Validate all inputs on backend
- Implement webhook handlers for payment confirmations
- Log all transactions
- Use environment variables for keys
- Implement rate limiting
- Add CSRF protection

### ❌ DON'T:
- Never expose secret keys in frontend code
- Never trust client-side amounts
- Never skip backend validation
- Never store credit card details yourself

## Testing

### Stripe Test Cards
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### PayPal Sandbox
Use sandbox accounts from PayPal Developer Dashboard for testing.

## Webhooks

### Stripe Webhooks
Set up webhooks to receive payment confirmations:

```javascript
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      'whsec_YOUR_WEBHOOK_SECRET'
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Update database, send confirmation email, etc.
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  res.json({received: true});
});
```

## Database Integration

After successful payment, store:
- User ID
- Product/Package purchased
- Amount paid
- Payment method
- Transaction ID
- Purchase date
- Status (paid, pending, refunded)

## Email Confirmations

Send confirmation emails after successful payments:
```javascript
// Using nodemailer or similar
async function sendPaymentConfirmation(email, details) {
  await sendEmail({
    to: email,
    subject: 'Payment Confirmation - Sport Center Training',
    html: `
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p><strong>Package:</strong> ${details.productName}</p>
      <p><strong>Amount:</strong> $${details.amount}</p>
      <p><strong>Transaction ID:</strong> ${details.transactionId}</p>
    `
  });
}
```

## Deployment Checklist

- [ ] Backend API deployed
- [ ] Stripe publishable key updated in frontend
- [ ] PayPal client ID configured
- [ ] Webhooks configured in Stripe/PayPal dashboards
- [ ] SSL/HTTPS enabled
- [ ] Database ready for transaction storage
- [ ] Email service configured
- [ ] Test all payment flows
- [ ] Monitor error logs
- [ ] Set up transaction alerts

## Production URLs to Update

In production, update these URLs in the code:
1. Success URL: `https://epavlenko.dev/payment-success`
2. Cancel URL: `https://epavlenko.dev/pricing`
3. Backend API URL: `https://your-api.epavlenko.dev`
4. Webhook URLs in Stripe/PayPal dashboards

## Support & Documentation

- **Stripe Docs**: https://stripe.com/docs
- **PayPal Docs**: https://developer.paypal.com/docs
- **Stripe Testing**: https://stripe.com/docs/testing
- **PayPal Sandbox**: https://developer.paypal.com/tools/sandbox

## Need Help?

Common issues:
1. **"Stripe not initialized"** - Wait for Stripe.js to load, or check publishable key
2. **CORS errors** - Configure CORS on your backend
3. **Webhook signature verification failed** - Check webhook secret
4. **Payment declined** - Check test card numbers or real card details

---

**Current Status**: Demo mode - ready for backend integration
**Next Steps**: Set up backend API and configure payment providers
