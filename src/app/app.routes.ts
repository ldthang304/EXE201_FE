import { Routes } from '@angular/router';
import { RouterConstant } from './constants/routerConstants';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProductCategoryComponent } from './views/product-category/product-category.component';
import { CartComponent } from './views/cart/cart.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { PaymentResultComponent } from './views/payment-result/payment-result.component';
import { OrdersComponent } from './views/orders/orders.component';
import { AdminLayoutComponent } from './views/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './views/admin/dashboard/dashboard.component';
import { AdminOrdersComponent } from './views/admin/orders/orders.component';
import { AdminPaymentsComponent } from './views/admin/payments/payments.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: RouterConstant.home, pathMatch: 'full' },
    { path: RouterConstant.login, component: LoginComponent },
    { path: RouterConstant.home, component: HomeComponent },
    { path: RouterConstant.productCategory, component: ProductCategoryComponent},
    { path: RouterConstant.cart, component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: 'payment-result', component: PaymentResultComponent},
    { path: 'orders', component: OrdersComponent},
    { path: RouterConstant.detailProduct, component: ProductDetailComponent },
    
    // Admin routes
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'orders', component: AdminOrdersComponent },
            { path: 'payments', component: AdminPaymentsComponent },
            { path: 'vnpay-history', component: AdminPaymentsComponent },
            { path: 'statistics', component: AdminDashboardComponent }
        ]
    },
    
    { path: '**', redirectTo: RouterConstant.home }
];
