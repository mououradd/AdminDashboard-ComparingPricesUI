import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { GalleriaModule } from 'primeng/galleria';
import { HttpClient } from '@angular/common/http';
import { ScrapingServiceService } from '../../../services/scraping-service.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [GalleriaModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './product-images.component.html',
})
export class ProductImagesComponent {
  constructor(
    public scrapingService: ScrapingServiceService,
    private http: HttpClient,
    private router: Router
  ) {}
  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '960px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  ngOnInit() {
    // this.scrapingService.scrapingData.productImageDTO =
    //   {
    //     images: ['assets/demo/images/galleria/galleria1.jpg']
    //   };
    this.scrapingService.PrintData();
  }
  back() {
    console.log(this.scrapingService.scrapingData);
    this.router.navigate(['/admin/products/add-product/review']);
  }
  next() {
    this.scrapingService
      .SaveData(this.scrapingService.scrapingData)
      .subscribe((data) => {
        console.log(data);
      });

    this.router.navigate(['/admin/products/add-product/confirm']);
  }
}
