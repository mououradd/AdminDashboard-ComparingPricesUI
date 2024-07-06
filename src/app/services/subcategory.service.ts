// app/services/subcategory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService {
    apiUrl : string = environment.api + '/SubCategory';

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
        return this.http.get<number>(`${this.apiUrl}/Count`)
            .toPromise()
            .then(data => data as number);
    }

}
