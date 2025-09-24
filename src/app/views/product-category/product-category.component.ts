import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { FilterGroup } from '../../interfaces/filterGroup.interface';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FilterSidebarComponent } from "../../components/filter-sidebar/filter-sidebar.component";
import { ProductSortComponent } from "../../components/product-sort/product-sort.component";
import { ProductGridComponent } from "../../components/product-grid/product-grid.component";

@Component({
  selector: 'app-product-category',
  imports: [CommonModule, BreadcrumbComponent, FilterSidebarComponent, ProductSortComponent, ProductGridComponent],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  totalProducts = 0;
  isLoading = false;
  isLoadingMore = false;
  hasMoreProducts = true;
  currentPage = 1;
  productsPerPage = 12;
  
  selectedFilters: { [key: string]: string[] } = {};
  currentSortOption = 'newest';
  
  breadcrumbs = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Sản phẩm', url: '/products' }
  ];

  filterGroups: FilterGroup[] = [
    {
      title: 'Danh mục',
      key: 'category',
      options: [
        { id: 'bowls', name: 'Bát, chén', count: 24 },
        { id: 'vases', name: 'Bình hoa, lọ', count: 18 },
        { id: 'trays', name: 'Khay, mâm', count: 15 },
        { id: 'boxes', name: 'Hộp đựng', count: 12 },
        { id: 'decorative', name: 'Đồ trang trí', count: 20 }
      ]
    },
    {
      title: 'Khoảng giá',
      key: 'priceRange',
      options: [
        { id: 'under-500k', name: 'Dưới 500.000₫', count: 15 },
        { id: '500k-1m', name: '500.000₫ - 1.000.000₫', count: 25 },
        { id: '1m-2m', name: '1.000.000₫ - 2.000.000₫', count: 20 },
        { id: '2m-5m', name: '2.000.000₫ - 5.000.000₫', count: 12 },
        { id: 'above-5m', name: 'Trên 5.000.000₫', count: 8 }
      ]
    },
    {
      title: 'Màu sắc chủ đạo',
      key: 'color',
      options: [
        { id: 'red', name: 'Đỏ', count: 18 },
        { id: 'black', name: 'Đen', count: 22 },
        { id: 'gold', name: 'Vàng', count: 16 },
        { id: 'brown', name: 'Nâu', count: 14 },
        { id: 'green', name: 'Xanh', count: 10 }
      ]
    },
    {
      title: 'Kích thước',
      key: 'size',
      options: [
        { id: 'small', name: 'Nhỏ (< 15cm)', count: 25 },
        { id: 'medium', name: 'Vừa (15-30cm)', count: 30 },
        { id: 'large', name: 'Lớn (> 30cm)', count: 15 }
      ]
    }
  ];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.products = this.generateMockProducts();
      this.totalProducts = this.products.length;
      this.applyFiltersAndSort();
      this.isLoading = false;
    }, 1000);
  }

  loadMoreProducts() {
    this.isLoadingMore = true;
    this.currentPage++;
    
    // Simulate loading more products
    setTimeout(() => {
      const startIndex = (this.currentPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;
      
      if (startIndex >= this.products.length) {
        this.hasMoreProducts = false;
      }
      
      this.applyFiltersAndSort();
      this.isLoadingMore = false;
    }, 800);
  }

  onFiltersChanged(filters: { [key: string]: string[] }) {
    this.selectedFilters = filters;
    this.currentPage = 1;
    this.hasMoreProducts = true;
    this.applyFiltersAndSort();
  }

  onSortChanged(sortOption: string) {
    this.currentSortOption = sortOption;
    this.applyFiltersAndSort();
  }

  onProductSelected(product: Product) {
    // Navigate to product detail page
    console.log('Navigate to product:', product.id);
  }

  onAddToCart(product: Product) {
    // Add product to cart
    console.log('Add to cart:', product);
  }

  private applyFiltersAndSort() {
    let filtered = [...this.products];
    
    // Apply filters
    Object.keys(this.selectedFilters).forEach(filterKey => {
      const selectedValues = this.selectedFilters[filterKey];
      if (selectedValues && selectedValues.length > 0) {
        filtered = filtered.filter(product => {
          switch (filterKey) {
            case 'category':
              return selectedValues.includes(product.category);
            case 'priceRange':
              return this.checkPriceRange(product.price, selectedValues);
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.currentSortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return 0; // Keep original order for newest
      }
    });

    // Apply pagination
    const endIndex = this.currentPage * this.productsPerPage;
    this.filteredProducts = filtered.slice(0, endIndex);
    this.hasMoreProducts = endIndex < filtered.length;
  }

  private checkPriceRange(price: number, selectedRanges: string[]): boolean {
    return selectedRanges.some(range => {
      switch (range) {
        case 'under-500k':
          return price < 500000;
        case '500k-1m':
          return price >= 500000 && price < 1000000;
        case '1m-2m':
          return price >= 1000000 && price < 2000000;
        case '2m-5m':
          return price >= 2000000 && price < 5000000;
        case 'above-5m':
          return price >= 5000000;
        default:
          return true;
      }
    });
  }

  private generateMockProducts(): Product[] {
    const categories = ['bowls', 'vases', 'trays', 'boxes', 'decorative'];
    const colors = ['red', 'black', 'gold', 'brown', 'green'];
    const products: Product[] = [];

    for (let i = 1; i <= 80; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const basePrice = Math.floor(Math.random() * 4000000) + 200000;
      const isOnSale = Math.random() < 0.3;
      const salePrice = isOnSale ? Math.floor(basePrice * 0.8) : basePrice;
      
      products.push({
        id: i,
        name: `Sản phẩm sơn mài ${i}`,
        price: salePrice,
        originalPrice: isOnSale ? basePrice : undefined,
        image: `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center&auto=format&q=80`,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        category: category
      });
    }

    return products;
  }
}
