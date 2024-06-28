import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { Product, ProductDetails } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RatingModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'] // Corrected from styleUrl to styleUrls
})
export class ProductDetailsComponent implements OnInit {

  images: { thumb: SafeUrl, full: SafeUrl }[] = [];
  product:ProductDetails = {} as ProductDetails;
  count:number=0;

  mainImage: SafeUrl;



  constructor(private sanitizer: DomSanitizer, private productService: ProductService, private activeRouter: ActivatedRoute) {

  }

  updateMainImage(image: SafeUrl) {
    this.mainImage = image;
  }

  ngOnInit(): void {
    // this.images = this.imageUrls.map(image => ({
    //     thumb: this.sanitizer.bypassSecurityTrustUrl(image.thumb),
    //     full: this.sanitizer.bypassSecurityTrustUrl(image.full)
    //   }));
      //this.mainImage = this.images[0].full;
    this.getproductDetails();
  }

  getproductDetails() {
    this.activeRouter.params.subscribe((params) => {
      console.log(params['id']);
      this.productService.getPproductDetails(params['id']).subscribe((data:ProductDetails) => {
        this.product=data
        this.mainImage =this.product.images[0]
        this.product.links.forEach(link =>  {
            link.domainLogo = this.getWebsiteLogo(link.productLink)
            console.log(link.domainLogo)
        }
        )
        this.count=this.product.links.length
        console.log(this.product);
      });
    });
  }

    getWebsiteLogo(url: string)   {
        if(url.includes('www.amazon')) {
        return '../../../assets/layout/images/amazonLogo.png'
    }
    else if(url.includes('www.noon')) {
        return '../../../assets/layout/images/noon.jpg'
    }

    else if(url.includes('www.jarir')) {
        return '../../../assets/layout/images/Garier.png'
    }
    else  {
        return '../../../assets/layout/images/blank.jpg'
    }

}
}
