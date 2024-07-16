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
  public images = [];
  ngOnInit() {
    this.scrapingService.scrapingData.productDetailDTO.forEach((x,i) => {
      if (i==0){
        x.images.forEach((image) => {
          if (image){
            this.images.push({
              src: image,
              isSelected: true,
            });
          }
        });
      }
      else {
        x.images.forEach((image) => {
          if (image){
            this.images.push({
              src: image,
              isSelected: false,
            });
          }
        });
      }
    });
    
    this.scrapingService.PrintData();
  }
  back() {
    this.SubmitImages();
    this.router.navigate(['/admin/products/add-product/review']);
  }
  next() {
   
    this.SubmitImages();
    this.router.navigate(['/admin/products/add-product/confirm']);
  }
  // Put Images into Scraping Service. ProductImageDTO[0].images
   SubmitImages() {
    this.scrapingService.scrapingData.productDetailDTO[0].images = this.images.reduce(
      (acc, image) => {
        if (image.isSelected) {
          acc.push(image.src);
        }
        return acc;
      },
      []
    );
    console.log(this.scrapingService.scrapingData.productDetailDTO[0].images);
   }
    
}
