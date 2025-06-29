import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse, Product } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'https://dummyjson.com/products';

  getProducts(
    limit: number = 30,
    skip: number = 0,
    search: string = '',
    sortBy: string = '',
    order: 'asc' | 'desc' = 'asc'
  ): Observable<ProductResponse> {
    const params: any = {
      limit,
      skip
    };

    if (search) {
      params.q = search;
      return this.http.get<ProductResponse>(`${this.baseUrl}/search`, { params });
    }

    if (sortBy) {
      params.sortBy = sortBy;
      params.order = order;
    }

    return this.http.get<ProductResponse>(this.baseUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
