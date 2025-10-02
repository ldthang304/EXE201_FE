import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { RouterConstant } from '../../constants/routerConstants';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    cartService = inject(CartService);
    authService = inject(AuthService);
    router = inject(Router);
    showMiniCart = false;

    toggleMiniCart() {
        this.showMiniCart = !this.showMiniCart;
    }

    goToCart() {
        this.router.navigate([RouterConstant.cart]);
    }

    goToLogin() {
        this.router.navigate([RouterConstant.login]);
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    getCurrentUser() {
        return this.authService.getCurrentUser();
    }

    logout() {
        this.authService.logout();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.cart-dropdown') && !target.closest('.cart-button')) {
            this.showMiniCart = false;
        }
    }
}
