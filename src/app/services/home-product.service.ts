
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeaturedProduct } from '../models/featuredProduct';

@Injectable({
    providedIn: 'root'
})
export class HomeProductService {
    private apiUrl = 'http://localhost:5066/api/CombinedProduct/home';

    constructor(private http: HttpClient) {}

    getProducts(page: number): Observable<FeaturedProduct[]> {
        return this.http.get<FeaturedProduct[]>(`${this.apiUrl}?page=${page}`);
    }
}
