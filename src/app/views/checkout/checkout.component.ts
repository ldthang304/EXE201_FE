import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { CheckoutService, CheckoutRequest } from '../../services/checkout.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  checkoutService = inject(CheckoutService);
  authService = inject(AuthService);
  router = inject(Router);

  // Form data
  shippingInfo = {
    fullName: '',
    phone: '',
    street: '',
    ward: '',
    district: '',
    province: ''
  };
  
  note = '';
  isProcessing = false;
  currentUser: any = null;

  // Computed properties
  get cartItems(): CartItem[] {
    return this.cartService.cartItemsList();
  }

  get totalPrice(): number {
    return this.cartService.totalPrice();
  }

  get shippingFee(): number {
    return 0; // Free shipping
  }

  get finalTotal(): number {
    return this.totalPrice + this.shippingFee;
  }

  ngOnInit() {
    console.log('Checkout component initialized');
    
    // Check if user is logged in
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user:', this.currentUser);
    
    if (!this.currentUser) {
      console.log('User not logged in, redirecting to login');
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/checkout' } });
      return;
    }

    // Check if cart is empty
    console.log('Cart items:', this.cartItems);
    if (this.cartItems.length === 0) {
      console.log('Cart is empty, redirecting to cart');
      this.router.navigate(['/cart']);
      return;
    }

    // Pre-fill user info if available
    if (this.currentUser) {
      this.shippingInfo.fullName = (this.currentUser.firstName || '') + ' ' + (this.currentUser.lastName || '');
      this.shippingInfo.phone = this.currentUser.phone || '';
      console.log('Pre-filled shipping info:', this.shippingInfo);
    }
  }

  onSubmit() {
    console.log('Submit button clicked'); // Debug log
    
    if (!this.validateForm()) {
      return;
    }

    if (!this.currentUser || !this.currentUser.id) {
      alert('Vui lòng đăng nhập để tiếp tục');
      this.router.navigate(['/login']);
      return;
    }

    this.isProcessing = true;
    console.log('Processing checkout...'); // Debug log

    // Prepare checkout request
    const checkoutRequest: CheckoutRequest = this.checkoutService.formatCheckoutRequest(
      this.currentUser.id,
      this.cartItems,
      this.finalTotal,
      this.shippingInfo,
      this.note
    );

    console.log('Checkout request:', checkoutRequest); // Debug log

    // Call checkout API
    this.checkoutService.checkoutWithVnPay(checkoutRequest).subscribe({
      next: (response) => {
        console.log('Checkout response:', response); // Debug log
        if (response.success && response.paymentUrl) {
          // Clear cart before redirecting
          this.cartService.clearCart();
          
          // Redirect to VNPay
          this.checkoutService.redirectToVnPay(response.paymentUrl);
        } else {
          alert('Có lỗi xảy ra khi tạo thanh toán: ' + response.message);
          this.isProcessing = false;
        }
      },
      error: (error) => {
        console.error('Checkout error:', error);
        let errorMessage = 'Có lỗi xảy ra khi xử lý thanh toán.';
        
        if (error.status === 0) {
          errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa.';
        } else if (error.status === 401) {
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
          this.router.navigate(['/login']);
        } else if (error.status === 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        
        alert(errorMessage);
        this.isProcessing = false;
      }
    });
  }

  validateForm(): boolean {
    console.log('Validating form with data:', this.shippingInfo);
    
    if (!this.shippingInfo.fullName.trim()) {
      alert('Vui lòng nhập họ tên');
      console.log('Validation failed: fullName');
      return false;
    }
    if (!this.shippingInfo.phone.trim()) {
      alert('Vui lòng nhập số điện thoại');
      console.log('Validation failed: phone');
      return false;
    }
    if (!this.shippingInfo.street.trim()) {
      alert('Vui lòng nhập địa chỉ');
      console.log('Validation failed: street');
      return false;
    }
    if (!this.shippingInfo.ward.trim()) {
      alert('Vui lòng nhập phường/xã');
      console.log('Validation failed: ward');
      return false;
    }
    if (!this.shippingInfo.district.trim()) {
      alert('Vui lòng nhập quận/huyện');
      console.log('Validation failed: district');
      return false;
    }
    if (!this.shippingInfo.province.trim()) {
      alert('Vui lòng nhập tỉnh/thành phố');
      console.log('Validation failed: province');
      return false;
    }
    
    console.log('Form validation passed');
    return true;
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  formatPrice(price: number): string {
    return this.cartService.formatPrice(price);
  }
}