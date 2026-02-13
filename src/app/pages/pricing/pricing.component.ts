import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentService, PaymentProduct } from '../../services/payment.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  products: PaymentProduct[] = [];
  selectedProduct: PaymentProduct | null = null;
  showPaymentModal = false;
  paymentMethod: 'stripe' | 'paypal' | null = null;
  processing = false;
  paymentSuccess = false;
  paymentError = false;
  errorMessage = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.products = this.paymentService.getPaymentProducts();
  }

  selectProduct(product: PaymentProduct) {
    this.selectedProduct = product;
    this.showPaymentModal = true;
    this.paymentSuccess = false;
    this.paymentError = false;
  }

  closeModal() {
    this.showPaymentModal = false;
    this.selectedProduct = null;
    this.paymentMethod = null;
    this.processing = false;
    this.paymentSuccess = false;
    this.paymentError = false;
    this.errorMessage = '';
  }

  selectPaymentMethod(method: 'stripe' | 'paypal') {
    this.paymentMethod = method;
  }

  async processPayment() {
    if (!this.selectedProduct || !this.paymentMethod) {
      return;
    }

    this.processing = true;
    this.paymentError = false;
    this.errorMessage = '';

    try {
      if (this.paymentMethod === 'stripe') {
        // In production, this would redirect to Stripe Checkout
        await this.paymentService.createCheckoutSession(this.selectedProduct);
        // If using Stripe Elements instead, you'd use processPayment()
        
        // For demo, simulate success after delay
        await this.simulatePayment();
      } else if (this.paymentMethod === 'paypal') {
        // In production, this would integrate with PayPal SDK
        await this.paymentService.createPayPalOrder(this.selectedProduct);
        
        // For demo, simulate success after delay
        await this.simulatePayment();
      }
    } catch (error: any) {
      this.paymentError = true;
      this.errorMessage = error.message || 'Payment failed. Please try again.';
      this.processing = false;
    }
  }

  private simulatePayment(): Promise<void> {
    // Demo mode: simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        this.processing = false;
        this.paymentSuccess = true;
        resolve();
      }, 2000);
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  calculateSavings(product: PaymentProduct): number | null {
    if (!product.sessions) return null;
    const singleSessionPrice = 75;
    const totalRegularPrice = singleSessionPrice * product.sessions;
    const savings = totalRegularPrice - product.price;
    return savings > 0 ? savings : null;
  }
}
