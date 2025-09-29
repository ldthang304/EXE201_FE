import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-image-gallery',
  imports: [CommonModule],
  templateUrl: './product-image-gallery.component.html',
  styleUrl: './product-image-gallery.component.css'
})
export class ProductImageGalleryComponent {
  @Input() images: string[] = [];
  @Input() productName = '';
  @Input() isOnSale = false;
  @Input() salePercentage = 0;

  selectedImage = '';
  currentIndex = 0;
  isModalOpen = false;

  ngOnInit() {
    if (this.images.length > 0) {
      this.selectedImage = this.images[0];
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
    this.currentIndex = this.images.indexOf(image);
  }

  previousImage() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.selectedImage = this.images[this.currentIndex];
  }

  nextImage() {
    this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    this.selectedImage = this.images[this.currentIndex];
  }

  openImageModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
