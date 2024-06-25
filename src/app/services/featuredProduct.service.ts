import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeaturedProduct } from '../models/featuredProduct';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:5066/api/featuredProduct';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<FeaturedProduct[]> {
        return this.http.get<FeaturedProduct[]>(this.apiUrl);
    }
}
