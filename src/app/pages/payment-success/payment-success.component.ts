import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  orderDetails: any = null;
  loading = true;
  error = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    // Get session ID from query params
    this.activatedRoute.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];

      if (this.sessionId) {
        // In production, you would verify the session with the backend
        this.verifyPayment();
      } else {
        this.loading = false;
        this.error = true;
      }
    });
  }

  private async verifyPayment() {
    try {
      if (!this.sessionId) {
        this.error = true;
        this.loading = false;
        return;
      }

      // Call the payment service to verify payment with backend
      const response = await this.paymentService.verifyPayment(this.sessionId);

      this.loading = false;

      if (response && response.paymentStatus === 'paid') {
        // Payment verified successfully
        this.orderDetails = {
          orderId: this.sessionId,
          date: new Date().toLocaleDateString(),
          amount: response.amountTotal ? `$${(response.amountTotal / 100).toFixed(2)}` : '$XXX.XX',
          customerEmail: response.customerEmail,
          status: response.paymentStatus
        };
      } else {
        this.error = true;
      }
    } catch (err) {
      console.error('Payment verification failed:', err);
      this.loading = false;
      this.error = true;
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToPricing() {
    this.router.navigate(['/pricing']);
  }
}

