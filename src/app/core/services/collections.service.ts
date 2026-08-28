import { Injectable } from '@angular/core';
import { BentoCollectionItem, BENTO_COLLECTIONS } from '../models/collections.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private collections: BentoCollectionItem[] = BENTO_COLLECTIONS;

  getCollections(): BentoCollectionItem[] {
    return [...this.collections];
  }

  getCollectionById(id: string): BentoCollectionItem | undefined {
    return this.collections.find(c => c.id === id);
  }
}

