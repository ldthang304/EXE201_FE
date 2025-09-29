import { Component } from '@angular/core';
import { ProductDetail } from '../../interfaces/productDetail.interface';
import { Review } from '../../interfaces/review.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductImageGalleryComponent } from "../../components/product-image-gallery/product-image-gallery.component";
import { ProductInfoComponent } from "../../components/product-info/product-info.component";
import { ProductTabsComponent } from "../../components/product-tabs/product-tabs.component";
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [ProductImageGalleryComponent, ProductInfoComponent, ProductTabsComponent, BreadcrumbComponent, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: ProductDetail | null = null;
  reviews: Review[] = [];
  relatedProducts: ProductDetail[] = [];
  isLoading = true;
  selectedQuantity = 1;
  averageRating = 0;
  totalReviews = 0;
  
  breadcrumbs = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Sản phẩm', url: '/products' },
    { label: 'Chi tiết sản phẩm' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  loadProduct(productId: number) {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.product = this.generateMockProduct(productId);
      this.reviews = this.generateMockReviews();
      this.relatedProducts = this.generateRelatedProducts();
      
      if (this.product) {
        this.breadcrumbs = [
          { label: 'Trang chủ', url: '/' },
          { label: 'Sản phẩm', url: '/products' },
          { label: this.product.name }
        ];
        this.calculateAverageRating();
      }
      
      this.isLoading = false;
    }, 1000);
  }

  onQuantityChanged(quantity: number) {
    this.selectedQuantity = quantity;
  }

  onAddToCart(data: { product: ProductDetail; quantity: number }) {
    console.log('Add to cart:', data);
    // Implement add to cart logic
  }

  onBuyNow(data: { product: ProductDetail; quantity: number }) {
    console.log('Buy now:', data);
    // Navigate to checkout
  }

  onAddToWishlist(product: ProductDetail) {
    console.log('Add to wishlist:', product);
    // Implement wishlist logic
  }

  onReviewAdded(review: Review) {
    this.reviews.unshift(review);
    this.calculateAverageRating();
  }

  onRelatedProductSelected(product: ProductDetail) {
    this.router.navigate(['/products', product.id]);
  }

  goBackToProducts() {
    this.router.navigate(['/products']);
  }

  getSalePercentage(product: ProductDetail): number {
    if (!product.originalPrice || !product.isOnSale) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  private calculateAverageRating() {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      this.totalReviews = 0;
      return;
    }
    
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = Math.round((total / this.reviews.length) * 10) / 10;
    this.totalReviews = this.reviews.length;
  }

  private generateMockProduct(id: number): ProductDetail {
    return {
      id,
      name: `Bình hoa sơn mài truyền thống ${id}`,
      price: 1500000,
      originalPrice: 2000000,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center&auto=format&q=80',
      category: 'vases',
      rating: 4.5,
      description: 'Bình hoa sơn mài thủ công tinh xảo với họa tiết truyền thống Việt Nam, được chế tác từ chất liệu cao cấp.',
      longDescription: `Bình hoa sơn mài này là tác phẩm nghệ thuật thủ công tuyệt đẹp, thể hiện tinh hoa của nghề sơn mài truyền thống Việt Nam. 

Được chế tác bởi những nghệ nhân lành nghề với hơn 20 năm kinh nghiệm, mỗi sản phẩm đều mang trong mình câu chuyện riêng và giá trị nghệ thuật độc đáo.

Quy trình sản xuất hoàn toàn thủ công, từ khâu chuẩn bị nguyên liệu đến hoàn thiện sản phẩm đều được thực hiện tỉ mỉ qua nhiều công đoạn phức tạp. Sản phẩm sử dụng sơn thiên nhiên cao cấp, đảm bảo độ bền màu và an toàn cho sức khỏe.`,
      specifications: {
        'Chất liệu': 'Gỗ tự nhiên, sơn mài cao cấp',
        'Xuất xứ': 'Việt Nam',
        'Kỹ thuật': 'Thủ công truyền thống',
        'Màu sắc': 'Đỏ, vàng, đen',
        'Bảo hành': '12 tháng'
      },
      materials: ['Gỗ tự nhiên', 'Sơn mài thiên nhiên', 'Vàng lá'],
      dimensions: {
        width: 15,
        height: 25,
        depth: 15
      },
      weight: 800,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&crop=center&auto=format&q=80'
      ],
      tags: ['sơn mài', 'thủ công', 'truyền thống', 'trang trí'],
      isOnSale: true,
      stock: 15,
      sku: `SM-${id}-001`,
      craftsman: 'Nghệ nhân Nguyễn Văn A',
      craftingTime: '2-3 tuần',
      careInstructions: [
        'Lau chùi bằng khăn mềm, khô',
        'Tránh để ở nơi ẩm ướt',
        'Không sử dụng chất tẩy rửa mạnh',
        'Bảo quản ở nhiệt độ phòng'
      ]
    };
  }

  private generateMockReviews(): Review[] {
    return [
      {
        id: 1,
        userId: 1,
        userName: 'Nguyễn Thị Mai',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c8b3?w=50&h=50&fit=crop&crop=face&auto=format&q=80',
        rating: 5,
        title: 'Sản phẩm tuyệt vời!',
        comment: 'Chất lượng vượt mong đợi, họa tiết rất đẹp và tinh xảo. Đóng gói cẩn thận, giao hàng nhanh.',
        createdAt: new Date('2024-01-15'),
        helpful: 12,
        verified: true
      },
      {
        id: 2,
        userId: 2,
        userName: 'Trần Văn Nam',
        rating: 4,
        title: 'Đáng tiền',
        comment: 'Sản phẩm đẹp, chất lượng tốt. Giá hơi cao nhưng xứng đáng với chất lượng.',
        createdAt: new Date('2024-01-10'),
        helpful: 8,
        verified: true
      },
      {
        id: 3,
        userId: 3,
        userName: 'Lê Thị Hoa',
        rating: 5,
        title: 'Quà tặng hoàn hảo',
        comment: 'Mua làm quà tặng, người nhận rất thích. Sản phẩm sang trọng và độc đáo.',
        createdAt: new Date('2024-01-05'),
        helpful: 15,
        verified: false
      }
    ];
  }

  private generateRelatedProducts(): ProductDetail[] {
    const products: ProductDetail[] = [];
    for (let i = 1; i <= 4; i++) {
      if (i !== this.product?.id) {
        products.push({
          ...this.generateMockProduct(i + 100),
          name: `Sản phẩm liên quan ${i}`
        });
      }
    }
    return products;
  }
}
