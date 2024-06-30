import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { Domain } from 'src/app/models/Domain';
import { DomainService } from 'src/app/services/Domain.service';

@Component({
    selector: 'app-domain',
    standalone: true,
    imports: [CommonModule,HttpClientModule,CarouselModule,ButtonModule],
    templateUrl: './domain.component.html',
    styleUrl: './domain.component.scss'
})
export class DomainComponent implements OnInit {

    constructor(private _DomainService: DomainService) { }

    domains: Domain[] = [];
    
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
        })
    }

    onImageError(event: Event) {
        (event.target as HTMLImageElement).src = './assets/layout/images/default-product-image.png';
    }
}
