
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeaturedProduct } from '../models/featuredProduct';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeProductService {
    apiUrl : string = environment.api + '/CombinedProduct/home';


    constructor(private http: HttpClient) {}

    getProducts(page: number): Observable<FeaturedProduct[]> {
        return this.http.get<FeaturedProduct[]>(`${this.apiUrl}?page=${page}`);
    }
}
