import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Brand } from '../models/category';

@Injectable({
    providedIn: 'root',
})
export class BrandService {
    public apiUrl = 'http://localhost:5066/api/Brand';

    constructor(private http: HttpClient) {}

    getBrands(): Observable<Brand[]> {
        return this.http.get<Brand[]>(this.apiUrl);
    }

    addBrand(brand: Brand): Observable<Brand> {
        return this.http.post<Brand>(this.apiUrl, brand);
    }

    updateBrand(brand: Brand): Observable<Brand> {
        return this.http.put<Brand>(`${this.apiUrl}/${brand.id}`, brand);
    }

    deleteBrand(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
