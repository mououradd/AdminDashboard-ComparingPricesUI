import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private apiUrl = 'http://localhost:5066/api/SubCategory';

  constructor(private http: HttpClient) { }

  getSubCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getSubCategoryCount(): Promise<number> {
    return this.http.get<number>('http://localhost:5066/api/SubCategory/Count')
      .toPromise()
      .then(data => data as number);
  }
}
