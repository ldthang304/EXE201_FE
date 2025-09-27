import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);
  router = inject(Router);

  // Computed properties
  get cartItems() {
    return this.cartService.cartItemsList();
  }

  get totalPrice() {
    return this.cartService.totalPrice();
  }

  get cartCount() {
    return this.cartService.cartCount();
  }

  // Methods
  updateQuantity(item: CartItem, newQuantity: number) {
    this.cartService.updateQuantity(item.product.id, newQuantity);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }

  addToWishlist(item: CartItem) {
    this.cartService.addToWishlist(item.product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  continueShopping() {
    this.router.navigate(['/']);
  }

  proceedToCheckout() {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout...');
  }
}
