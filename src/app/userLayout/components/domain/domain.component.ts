// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
// import { CarouselModule } from 'primeng/carousel';
// import { Domain } from 'src/app/models/Domain';
// import { DomainService } from 'src/app/services/Domain.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// @Component({
//     selector: 'app-domain',
//     standalone: true,
//     imports: [CommonModule,HttpClientModule,CarouselModule,ButtonModule],
//     templateUrl: './domain.component.html',
//     styleUrl: './domain.component.scss',
//     schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
// }import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/models/Domain';
import { DomainService } from 'src/app/services/Domain.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper, { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/swiper-bundle.css';

@Component({
    selector: 'app-domain',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './domain.component.html',
    styleUrls: ['./domain.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DomainComponent implements OnInit {
    constructor(private _DomainService: DomainService) { }

    domains: Domain[] = [];

    ngOnInit(): void {
        this._DomainService.getAllDomains().subscribe({
            next: (data) => {
                console.log(data);
                this.domains = data;
                console.log(this.domains);
                this.initializeSwiper();
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    initializeSwiper() {
        new Swiper('.swiper-container', {
            modules: [Autoplay, Pagination, Navigation],
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                560: {
                    slidesPerView: 1,
                    spaceBetween: 10
                }
            }
        });
    }

    onImageError(event: Event) {
        (event.target as HTMLImageElement).src = './assets/layout/images/default-product-image.png';
    }
}

