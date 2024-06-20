// app/services/subcategory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService {
    private apiUrl = 'http://localhost:5066/api/SubCategory';

    constructor(private http: HttpClient) { }

    getSubCategories(): Observable<SubCategory[]> {
        return this.http.get<SubCategory[]>(this.apiUrl);
    }

    addSubCategory(subCategory: SubCategory): Observable<SubCategory> {
        return this.http.post<SubCategory>(this.apiUrl, subCategory);
    }

    updateSubCategory(subCategory: SubCategory): Observable<SubCategory> {
        return this.http.put<SubCategory>(`${this.apiUrl}/${subCategory.categoryId}`, subCategory);
    }

    deleteSubCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
