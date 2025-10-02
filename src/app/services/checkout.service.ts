import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckoutRequest {
  userId: number;
  items: CartItemRequest[];
  totalAmount: number;
  note?: string;
  shipFullName: string;
  shipPhone: string;
  shipStreet: string;
  shipWard: string;
  shipDistrict: string;
  shipProvince: string;
}

export interface CartItemRequest {
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
}

export interface VnPayResponse {
  success: boolean;
  paymentUrl?: string;
  paymentCode?: string;
  message: string;
}

export interface PaymentResult {
  success: boolean;
  message: string;
  orderCode?: string;
  transactionNo?: string;
  paymentCode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8081/api/checkout'; // Đổi sang port 8081 nếu backend chạy trên port này

  constructor(private http: HttpClient) {}

  /**
   * Create VNPay payment URL
   */
  checkoutWithVnPay(checkoutRequest: CheckoutRequest): Observable<VnPayResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<VnPayResponse>(`${this.baseUrl}/vnpay`, checkoutRequest, { headers });
  }

  /**
   * Get order details by order code
   */
  getOrderDetails(orderCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/${orderCode}`);
  }

  /**
   * Process VNPay return (for testing purposes)
   */
  processVnPayReturn(params: any): Observable<PaymentResult> {
    return this.http.get<PaymentResult>(`${this.baseUrl}/vnpay/return`, { params });
  }

  /**
   * Redirect to VNPay payment page
   */
  redirectToVnPay(paymentUrl: string): void {
    window.location.href = paymentUrl;
  }

  /**
   * Format checkout request from cart data
   */
  formatCheckoutRequest(
    userId: number,
    cartItems: any[],
    totalAmount: number,
    shippingInfo: any,
    note?: string
  ): CheckoutRequest {
    const items: CartItemRequest[] = cartItems.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productPrice: item.product.price,
      quantity: item.quantity,
      productImage: item.product.image || ''
    }));

    return {
      userId,
      items,
      totalAmount,
      note,
      shipFullName: shippingInfo.fullName,
      shipPhone: shippingInfo.phone,
      shipStreet: shippingInfo.street,
      shipWard: shippingInfo.ward,
      shipDistrict: shippingInfo.district,
      shipProvince: shippingInfo.province
    };
  }
}
