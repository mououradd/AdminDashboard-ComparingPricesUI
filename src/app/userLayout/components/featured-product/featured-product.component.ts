import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../../../app/services/featuredProduct.service';
import { FeaturedProduct } from '../../../../app/models/featuredProduct';

@Component({
    selector: 'featured-product',
    templateUrl: './featured-product.component.html',
    styleUrls: ['./featured-product.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        CarouselModule,
        ButtonModule
    ]
})
export class FeaturedProductComponent implements OnInit {
    products: FeaturedProduct[] = [];
    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts(1).subscribe((data: FeaturedProduct[]) => {
            this.products = data;
            // this.products.forEach(product => {
            //     product.isFavorite = false;  // Add isFavorite property initially set to false
            // });
        });
    }

    onImageError(event: Event) {
        (event.target as HTMLImageElement).src = './assets/layout/images/default-product-image.png';
    }

    // toggleFavorite(product: Product) {
    //     product.isFavorite = !product.isFavorite;
    // }

    seeAll() {
        // Add logic for the "See all" button click event
        console.log('See all button clicked');
    }

}
