import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/Brand';
import { BrandProductsCountDTO } from '../models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:5066/api/Brand';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBrand(brand: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, brand);
  }

  updateBrand( brand: any): Observable<Brand> {
    return this.http.put<any>(`${this.apiUrl}/${brand.id}`, brand);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBrandCount(): Promise<number> {
    return this.http.get<number>('http://localhost:5066/api/Brand/Count')
      .toPromise()
      .then(data => data as number);
  }
  getProductCountForBrand(): Promise<BrandProductsCountDTO[]> {
    return this.http.get<BrandProductsCountDTO[]>(`http://localhost:5066/api/Brand/productscount/`)
      .toPromise()
      .then(data => data as BrandProductsCountDTO[]);
}
}
