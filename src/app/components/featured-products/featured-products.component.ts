import { Component, signal } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-featured-products',
  imports: [ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
  featuredProducts = signal<Product[]>([
    {
      id: 1,
      name: 'Bình Hoa Sơn Mài Hoa Sen',
      price: 1200000,
      originalPrice: 1500000,
      image: '/api/placeholder/300/300',
      category: 'Bình hoa',
      rating: 5,
      reviews: 24
    },
    {
      id: 2,
      name: 'Đĩa Trang Trí Rồng Phượng',
      price: 800000,
      image: '/api/placeholder/300/300',
      category: 'Đĩa trang trí',
      rating: 4,
      reviews: 18
    },
    {
      id: 3,
      name: 'Hộp Trang Sức Hoa Cúc',
      price: 650000,
      originalPrice: 750000,
      image: '/api/placeholder/300/300',
      category: 'Hộp trang sức',
      rating: 5,
      reviews: 32
    },
    {
      id: 4,
      name: 'Tranh Sơn Mài Phong Cảnh',
      price: 2500000,
      image: '/api/placeholder/300/300',
      category: 'Tranh sơn mài',
      rating: 5,
      reviews: 15
    }
  ]);
}
