import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { GalleriaModule } from 'primeng/galleria';
import { HttpClient } from '@angular/common/http';
import { ScrapingServiceService } from '../../../services/scraping-service.service';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

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
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './review-product.component.html',
})
export class ReviewProductComponent {
    constructor(
        private http: HttpClient,
        public scrapingService: ScrapingServiceService,
        private router: Router,
        private _MessageService: MessageService
    ) {}
    currentIndex: number = 0;
    ngOnInit() {
        console.log(this.scrapingService.scrapingData.productDetailDTO);
    }
    onChange(event: any) {
        this.currentIndex = this.scrapingService.urls.indexOf(event.value);
        console.log(this.currentIndex);
    }
    back() {
        this.router.navigate(['/admin/products/add-product/add']);
    }
    next() {
        if (!this.isValid()) {
            this._MessageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please Make Sure Names & Description not Empty in all Scraped Links',
            });
            return;
        }
        this.router.navigate(['/admin/products/add-product/images']);
    }
    isValid(): boolean {
        // Ensure fields are not empty or equal to "" in productDetailDTO array
        const productDetails =
            this.scrapingService.scrapingData.productDetailDTO;

        for (let item of productDetails) {
            if (
                !item.name_Global ||
                item.name_Global === '' ||
                !item.description_Global ||
                item.description_Global === '' ||
                !item.price
            ) {
                return false;
            }
        }
        return true;
    }
}
