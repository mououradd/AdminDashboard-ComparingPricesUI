import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Category } from './category.model'; // Ensure this model is correctly defined
import { Category, CategoryBrandsCountDTO } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5066/api/Category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getCategoryCount() {
    return this.http.get<number>('http://localhost:5066/api/Category/Count')
        .toPromise()
        .then(data => data as number);
}
getBrandCountForCategory():Promise<CategoryBrandsCountDTO[]> {
    return this.http.get<CategoryBrandsCountDTO[]>('http://localhost:5066/api/Category/CategoriesBrandsCount')
        .toPromise()
        .then(data => data as CategoryBrandsCountDTO[]);
}
}
