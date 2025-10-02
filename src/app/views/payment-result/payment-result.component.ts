import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent implements OnInit {
  isSuccess: boolean = false;
  isLoading: boolean = true;
  message: string = '';
  orderCode: string = '';
  transactionNo: string = '';
  paymentCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    // Get query parameters from VNPay return
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        // Process VNPay return parameters
        this.processPaymentResult(params);
      } else {
        // No parameters, redirect to home
        this.router.navigate(['/']);
      }
    });
  }

  processPaymentResult(params: any) {
    this.checkoutService.processVnPayReturn(params).subscribe({
      next: (result) => {
        this.isSuccess = result.success;
        this.message = result.message;
        this.orderCode = result.orderCode || '';
        this.transactionNo = result.transactionNo || '';
        this.paymentCode = result.paymentCode || '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error processing payment result:', error);
        this.isSuccess = false;
        this.message = 'Có lỗi xảy ra khi xử lý kết quả thanh toán';
        this.isLoading = false;
      }
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToOrders() {
    // Navigate to user orders page (to be implemented)
    this.router.navigate(['/orders']);
  }

  tryAgain() {
    this.router.navigate(['/cart']);
  }
}