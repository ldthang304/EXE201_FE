import { Routes } from '@angular/router';
import { RouterConstant } from './constants/routerConstants';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProductCategoryComponent } from './views/product-category/product-category.component';
import { CartComponent } from './views/cart/cart.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: RouterConstant.home, pathMatch: 'full' },
    { path: RouterConstant.login, component: LoginComponent },
    { path: RouterConstant.home, component: HomeComponent },
    { path: RouterConstant.productCategory, component: ProductCategoryComponent},
    { path: RouterConstant.cart, component: CartComponent},
    { path: RouterConstant.detailProduct, component: ProductDetailComponent },
    { path: '**', redirectTo: RouterConstant.home }
];
