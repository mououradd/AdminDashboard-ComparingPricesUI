import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SponsoredProduct} from '../models/product'

@Injectable({
  providedIn: 'root'
})
export class SponsoredProductsService {

    public apiUrl = 'https://pricecomparing.azurewebsites.net/api/ProductSponsored';

    constructor(private http: HttpClient) { }

     getSponsoredProducts(): Observable<SponsoredProduct[]> {
        return this.http.get<SponsoredProduct[]>(this.apiUrl);
    }

    addSponsoredProduct(product: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, product);
    }

    updateSponsoredProduct(product: SponsoredProduct): Observable<SponsoredProduct> {
        return this.http.put<SponsoredProduct>(`${this.apiUrl}/${product.id}`, product);
    }

    deleteSponsoredProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/SoftDelete/${id}`);
    }

}
