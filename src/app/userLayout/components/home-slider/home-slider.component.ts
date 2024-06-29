import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomainService } from 'src/app/services/Domain.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-slider',
    standalone: true,
    imports: [CommonModule, CarouselModule],
    templateUrl: './home-slider.component.html',
    styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {

    domains: any[] = [];

    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 6
            }
        },
        nav: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
    }

    constructor(private _DomainService: DomainService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this._DomainService.getDomainForSlider().subscribe({
            next: (result) => {
                console.log(result); // Verify data in console
                this.domains = result;
                this.updateCustomOptions();
                this.cdr.detectChanges(); // Trigger change detection
            },
            error: () => {
                console.log('Error');
            },
        });
    }

    updateCustomOptions(): void {
        const itemCount = this.domains.length;
        this.customOptions = {
            ...this.customOptions,
            responsive: {
                0: {
                    items: Math.min(1, itemCount)
                },
                400: {
                    items: Math.min(2, itemCount)
                },
                740: {
                    items: Math.min(3, itemCount)
                },
                940: {
                    items: Math.min(6, itemCount)
                }
            }
        };
        this.cdr.detectChanges(); // Trigger change detection
    }
}
