import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand , BrandProductsCountDTO } from '../models/category';

@Injectable({
    providedIn: 'root',
})
export class BrandService {
    public apiUrl = 'https://melakher.azurewebsites.net/api/Brand';

    constructor(private http: HttpClient) {}

    getBrands(): Observable<Brand[]> {
        return this.http.get<Brand[]>(this.apiUrl);
    }

    addBrand(brand: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, brand);
    }

    updateBrand(brand: Brand): Observable<Brand> {
        return this.http.put<Brand>(`${this.apiUrl}/${brand.id}`, brand);
    }

    deleteBrand(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/SoftDelete/${id}`);
    }

    getBrandCount(): Promise<number> {
        return this.http.get<number>('https://melakher.azurewebsites.net/api/Brand/Count')
        .toPromise()
        .then(data => data as number);
    }
    getProductCountForBrand(): Promise<BrandProductsCountDTO[]> {
        return this.http.get<BrandProductsCountDTO[]>(`https://melakher.azurewebsites.net/api/Brand/productscount/`)
          .toPromise()
          .then(data => data as BrandProductsCountDTO[]);
    }
}
