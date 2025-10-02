import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Order, OrderStatus } from '../../interfaces/order.interface';
import { Payment } from '../../interfaces/payment.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);

  orders: Order[] = [];
  payments: Payment[] = [];
  loading = false;
  currentUser: any = null;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/orders' } });
      return;
    }

    this.loadUserOrders();
    this.loadUserPayments();
  }

  loadUserOrders() {
    this.loading = true;
    this.userService.getUserOrders(this.currentUser.id).subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => 
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user orders:', error);
        this.loading = false;
      }
    });
  }

  loadUserPayments() {
    this.userService.getUserPayments(this.currentUser.id).subscribe({
      next: (payments) => {
        this.payments = payments;
      },
      error: (error) => {
        console.error('Error loading user payments:', error);
      }
    });
  }

  getPaymentForOrder(orderId: number): Payment | undefined {
    return this.payments.find(payment => payment.order.id === orderId);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'SHIPPING': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'PENDING': return 'Chờ xử lý';
      case 'CONFIRMED': return 'Đã xác nhận';
      case 'SHIPPING': return 'Đang giao hàng';
      case 'DELIVERED': return 'Đã giao hàng';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  }

  getPaymentStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getPaymentStatusText(status: string): string {
    switch (status) {
      case 'PENDING': return 'Chờ thanh toán';
      case 'SUCCESS': return 'Đã thanh toán';
      case 'FAILED': return 'Thanh toán thất bại';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  viewOrderDetails(order: Order) {
    // Navigate to order details page (to be implemented)
    console.log('View order details:', order);
  }

  reorder(order: Order) {
    // Add order items back to cart
    console.log('Reorder:', order);
    alert('Chức năng đặt lại đơn hàng sẽ được cập nhật sớm');
  }

  cancelOrder(order: Order) {
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      // Call API to cancel order
      console.log('Cancel order:', order);
      alert('Chức năng hủy đơn hàng sẽ được cập nhật sớm');
    }
  }
}