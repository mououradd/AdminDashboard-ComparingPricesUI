import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private getAllProductsUrl: string = 'http://localhost:5066/api/CombinedProduct';
  private confirmProductUrl: string = 'http://localhost:5066/api/confirm-product';  
  private deleteProductUrl: string = 'http://localhost:5066/api/CombinedProduct/';
  private bulkDeleteUrl: string = 'http://localhost:5066/api/CombinedProduct/bulk-delete';
  
  private productData: any;

  getAllProducts():Observable<any>{
      return this.http.get(this.getAllProductsUrl);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteProductUrl}${id}`);
  }

  bulkDeleteProducts(ids: number[]): Observable<any> {
    return this.http.request('delete', this.bulkDeleteUrl, { body: ids });
  }

  setProductData(data: any) {
    this.productData = data;
  }

  getProductData() {
    return this.productData;
  }

  confirmProduct(data: any): Observable<any> {
    return this.http.post(this.confirmProductUrl, data);
  }

  getProductsSmall() {
      return this.http.get<any>('assets/demo/data/products-small.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }

  getProducts() {
      return this.http.get<any>('assets/demo/data/products.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }

  getProductsMixed() {
      return this.http.get<any>('assets/demo/data/products-mixed.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }

  getProductsWithOrdersSmall() {
      return this.http.get<any>('assets/demo/data/products-orders-small.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }
}
