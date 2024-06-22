import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';
import { ScrapingServiceService } from '../../../services/scraping-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-confirm-product',
    templateUrl: './confirm-product.component.html',
    styleUrls: ['./confirm-product.component.css'],
    imports: [CommonModule, ToastModule],
    standalone: true,
    providers: [MessageService],
})
export class ConfirmProductComponent implements OnInit {
    productData: any;

    constructor(
        private router: Router,
        private productService: ProductService,
        public scrapingService: ScrapingServiceService,
        private messageService: MessageService
    ) {}

    ngOnInit() {

    }

    confirmProduct() {
        this.scrapingService
            .SaveData(this.scrapingService.scrapingData)
            .subscribe(
                (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Product added successfully with Ref ID: ${res}`,
                    });
                    this.router.navigate(['/admin/products']);
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error adding product',
                    });
                }
            );
    }

    goBack() {
        this.router.navigate(['/admin/products/add-product/images']);
    }

    addAnotherProduct() {
        this.productService.setProductData(null); // Clear the current product data
        this.router.navigate(['/admin/products/add-product/add']);
    }
}
