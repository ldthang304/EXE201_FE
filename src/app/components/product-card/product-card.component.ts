import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  
  cartService = inject(CartService);
  Math = Math;

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  addToWishlist() {
    this.cartService.addToWishlist(this.product);
  }
}
