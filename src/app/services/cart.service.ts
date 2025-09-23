import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = signal<Product[]>([]);
  private wishlistItems = signal<Product[]>([]);

  cartCount = signal(0);
  wishlistCount = signal(3);
  showCart = signal(false);

  addToCart(product: Product) {
    const current = this.cartItems();
    this.cartItems.set([...current, product]);
    this.cartCount.set(this.cartCount() + 1);
  }

  addToWishlist(product: Product) {
    const current = this.wishlistItems();
    this.wishlistItems.set([...current, product]);
    this.wishlistCount.set(this.wishlistCount() + 1);
  }

  toggleCart() {
    this.showCart.set(!this.showCart());
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
}
