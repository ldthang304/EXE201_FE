import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MiniCartComponent } from '../mini-cart/mini-cart.component';
import { RouterConstant } from '../../constants/routerConstants';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MiniCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    cartService = inject(CartService);
    router = inject(Router);
    showMiniCart = false;

    toggleMiniCart() {
        this.showMiniCart = !this.showMiniCart;
    }

    goToCart() {
        this.router.navigate([RouterConstant.cart]);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.cart-dropdown') && !target.closest('.cart-button')) {
            this.showMiniCart = false;
        }
    }
}
