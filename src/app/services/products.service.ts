import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/products';

  getAllProducts() :Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number) :Observable<Product>{
    return this.http.get<Product>(`${this.url}/${id}`);
  }
  
}
