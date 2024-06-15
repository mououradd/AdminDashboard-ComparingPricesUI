import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../models/product';
import { StepsMenuComponent } from '../../steps-menu/steps-menu.component';
import { ScrapingServiceService } from '../../../services/scraping-service.service';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    StepsMenuComponent,
  ],
})
export class AddProductComponent {
  constructor(
    public scrapingService: ScrapingServiceService,
    //Router to Navigate
    public router: Router
  ) {}
  submitted: boolean = false;
  ngOnInit() {}

  addUrl(): void {
    this.scrapingService.addUrl();
  }

  deleteUrl(index: number): void {
    this.scrapingService.deleteUrl(index);
  }

  saveProduct() {}

  next() {
    // console.log(this.scrapingService.scrapingData);
    // this.scrapingService
    //   .GetImages([this.scrapingService.urls[0]])
    //   .subscribe((data) => {
    //     this.scrapingService.scrapingData.productImageDTO.images =
    //       data[0].images;
    //   });
    this.scrapingService
      .GetImages(this.scrapingService.urls)
      .subscribe((data) => {
        this.scrapingService.scrapingData.productDetailDTO = data;
        // this.scrapingService.scrapingData.productImageDTO.images = data[0].images;
        this.router.navigate(['/admin/products/add-product/review']);
      });

  }

  back() {
    this.router.navigate(['/admin/products']);
  }

  isNextButtonEnabled(): boolean {
    return !this.scrapingService.urls.some(url => url === 'https://www.example.com/') && this.scrapingService.urls.length > 0;
  }
}
