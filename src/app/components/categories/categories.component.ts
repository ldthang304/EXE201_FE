import { Component, signal } from '@angular/core';
import { CategoryCardComponent } from "../category-card/category-card.component";
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = signal<Category[]>([
    { id: 1, name: 'Bình Hoa Sơn Mài', image: '/api/placeholder/300/200', productCount: 24 },
    { id: 2, name: 'Đĩa Trang Trí', image: '/api/placeholder/300/200', productCount: 18 },
    { id: 3, name: 'Hộp Trang Sức', image: '/api/placeholder/300/200', productCount: 12 },
    { id: 4, name: 'Tranh Sơn Mài', image: '/api/placeholder/300/200', productCount: 30 }
  ]);
}
