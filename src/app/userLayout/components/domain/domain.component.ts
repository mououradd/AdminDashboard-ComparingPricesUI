// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
// import { CarouselModule } from 'primeng/carousel';
// import { Domain } from 'src/app/models/Domain';
// import { DomainService } from 'src/app/services/Domain.service';

// @Component({
//     selector: 'app-domain',
//     standalone: true,
//     imports: [CommonModule,HttpClientModule,CarouselModule,ButtonModule],
//     templateUrl: './domain.component.html',
//     styleUrl: './domain.component.scss'
// })
// export class DomainComponent implements OnInit {

//     constructor(private _DomainService: DomainService) { }

//     domains: Domain[] = [];

//     carouselResponsiveOptions: any[] = [
//         {
//             breakpoint: '1024px',
//             numVisible: 3,
//             numScroll: 3
//         },
//         {
//             breakpoint: '768px',
//             numVisible: 2,
//             numScroll: 2
//         },
//         {
//             breakpoint: '560px',
//             numVisible: 1,
//             numScroll: 1
//         }
//     ];

//     ngOnInit(): void {
//         this._DomainService.getAllDomains().subscribe({
//             next: (data) => {
//                 console.log(data);
//                 this.domains = data;
//                 console.log(this.domains);
//             },
//             error: (error) => {
//                 console.log(error);
//             }
//         })
//     }

//     onImageError(event: Event) {
//         (event.target as HTMLImageElement).src = './assets/layout/images/default-product-image.png';
//     }
// }import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

import { Domain } from 'src/app/models/Domain';
import { DomainService } from 'src/app/services/Domain.service';
import { SwiperOptions } from 'swiper/types';

@Component({
    selector: 'app-domain',
    standalone: true,
    imports: [],
    templateUrl: './domain.component.html',
    styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit, AfterViewInit {

    constructor(private _DomainService: DomainService) { }

    domains: Domain[] = [];

    swiperConfig: SwiperOptions = {
        slidesPerView: 5,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            560: {
                slidesPerView: 1,
                spaceBetween: 5,
            },
        }
    };

    ngOnInit(): void {
        this._DomainService.getAllDomains().subscribe({
            next: (data) => {
                console.log(data);
                this.domains = data;
                console.log(this.domains);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    ngAfterViewInit(): void {
        new Swiper('.swiper-container', this.swiperConfig);
    }

    onImageError(event: Event) {
        (event.target as HTMLImageElement).src = './assets/layout/images/default-product-image.png';
    }
}
