import { Injectable } from '@angular/core';
import { ServiceItem, servicesList, clientReviews } from '../data/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private services: ServiceItem[] = servicesList;
  private reviews = clientReviews;

  getServices(): ServiceItem[] {
    return [...this.services];
  }

  getServiceById(id: string): ServiceItem | undefined {
    return this.services.find(s => s.id === id);
  }

  getReviews() {
    return [...this.reviews];
  }
}

