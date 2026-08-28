import { Injectable, signal } from '@angular/core';
import { ProductItem } from '../data/products';
import { BentoCollectionItem } from '../data/collections';
import { ProjectItem } from '../data/projects';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Product Detail Modal
  readonly productModalOpen = signal<boolean>(false);
  readonly selectedProduct = signal<ProductItem | BentoCollectionItem | null>(null);

  // Project Detail Lightbox Modal
  readonly projectModalOpen = signal<boolean>(false);
  readonly selectedProject = signal<ProjectItem | null>(null);

  // License Document Modal
  readonly licenseModalOpen = signal<boolean>(false);
  readonly isLicenseOpen = this.licenseModalOpen;

  openProductDetail(item: ProductItem | BentoCollectionItem): void {
    this.selectedProduct.set(item);
    this.productModalOpen.set(true);
  }

  closeProductDetail(): void {
    this.productModalOpen.set(false);
    this.selectedProduct.set(null);
  }

  openProjectDetail(project: ProjectItem): void {
    this.selectedProject.set(project);
    this.projectModalOpen.set(true);
  }

  closeProjectDetail(): void {
    this.projectModalOpen.set(false);
    this.selectedProject.set(null);
  }

  openLicenseModal(): void {
    this.licenseModalOpen.set(true);
  }

  closeLicenseModal(): void {
    this.licenseModalOpen.set(false);
  }
}
