import { Injectable } from '@angular/core';
import { ProductItem, productsList } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: ProductItem[] = productsList;

  getProducts(): ProductItem[] {
    return [...this.products];
  }

  getFeaturedProducts(): ProductItem[] {
    return this.products.filter(p => p.featured);
  }

  getProductById(id: string): ProductItem | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): ProductItem[] {
    if (!category || category === 'all') return this.getProducts();
    return this.products.filter(p => p.category === category);
  }
}

