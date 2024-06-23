import { Injectable } from '@angular/core';
import {
  ScrapingData,
  ProductDetailDTO,
  ProductImageDTO,
  ProductPostDTO,
} from './scraping-service.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ScrapingServiceService {
  constructor(
    //Inject HttpClient
    private http: HttpClient
  ) {}
  //Scraping URL
  private scrapingUrl = 'http://localhost:5066/api/AddProduct/AddProduct';
  private SrapeImageUrl = 'https://price-comparison-scraper.onrender.com/scrape/';
  public GetImages(url: string[]): Observable<any> {
    return this.http.post(this.SrapeImageUrl, { urls: url });
  }
  //Scrape Data
  public SaveData(data: ScrapingData): Observable<any> {
    return this.http.post(this.scrapingUrl, data);
  }
  // Print Data
  public PrintData() {
    console.log(this.scrapingData);
  }
  //#region Urls
  public urls: string[] = ['https://www.example.com/'];
  addUrl(): void {
    this.urls.push('');
  }
  deleteUrl(index: number): void {
    if (this.urls.length === 1) {
      return;
    }
    this.urls.splice(index, 1);
  }
  //End region
  //Product Post DTO
  public productPostDTO: ProductPostDTO = {
    name_Local: '',
    name_Global: '',
    description_Local: '',
    description_Global: '',
    subCategoryId: 1,
    brandId: 1,
  };
  //Product Detail DTO
  public productDetailDTO: ProductDetailDTO = {
    prodId: 1,
    domainId: 1,
    productLink1: '',
    status: '',
    lastUpdated: new Date(),
    lastScraped: new Date(),
    id: 1,
    name_Local: '',
    name_Global: '',
    description_Local: '',
    description_Global: '',
    price: 1,
    rating: 1,
    isAvailable: true,
    brand: '',
    images: ['assets/demo/images/galleria/galleria1.jpg'],
  };
  //Product Image DTO
  public productImageDTO: ProductImageDTO = {
    images: ['assets/demo/images/galleria/galleria1.jpg'],
  };
  //Scraping Data
  public scrapingData: ScrapingData = {
    productPostDTO: this.productPostDTO,
    productDetailDTO: [this.productDetailDTO],
    // productImageDTO: this.productImageDTO,
  };
  // Function to check if there are any URLs added
  // public isUrlsAdded(): boolean {
  //   return this.urls.length > 0;
  // }
}
