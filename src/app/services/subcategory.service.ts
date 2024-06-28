// app/services/subcategory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService {
    public apiUrl = 'https://melakher.azurewebsites.net/api/SubCategory';

    constructor(private http: HttpClient) { }

    getSubCategories(): Observable<SubCategory[]> {
        return this.http.get<SubCategory[]>(this.apiUrl);
    }

    addSubCategory(subCategory: SubCategory): Observable<SubCategory> {
        return this.http.post<SubCategory>(this.apiUrl, subCategory);
    }

    // In `SubCategoryService`
    updateSubCategory(subCategory: SubCategory): Observable<SubCategory> {
        return this.http.put<SubCategory>(`${this.apiUrl}/${subCategory.id}`, subCategory);
    }


    deleteSubCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    getSubCategoryCount(): Promise<number> {
        return this.http.get<number>('https://melakher.azurewebsites.net/api/SubCategory/Count')
          .toPromise()
          .then(data => data as number);
      }
}
