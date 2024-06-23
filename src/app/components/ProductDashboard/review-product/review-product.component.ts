import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { GalleriaModule } from 'primeng/galleria';
import { HttpClient } from '@angular/common/http';
import { ScrapingServiceService } from '../../../services/scraping-service.service';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

export interface Image {
  previewImageSrc?: any;
  thumbnailImageSrc?: any;
  alt?: any;
  title?: any;
}
@Component({
  selector: 'app-review-product',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    GalleriaModule,
    ListboxModule,
    ButtonModule,
  ],
  templateUrl: './review-product.component.html',
})
export class ReviewProductComponent {
  constructor(
    private http: HttpClient,
    public scrapingService: ScrapingServiceService,
    private router: Router
  ) {}
  currentIndex: number = 0;
  onChange(event: any) {
    this.currentIndex = this.scrapingService.urls.indexOf(event.value);
    console.log(this.currentIndex);
  }
  back() {
    this.router.navigate(['/admin/products/add-product/add']);
  }
  next() {    
    this.router.navigate(['/admin/products/add-product/images']);
  }
}
