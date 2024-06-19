import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-product',
    templateUrl: './confirm-product.component.html',
    styleUrls: ['./confirm-product.component.css'],
    imports: [CommonModule],
    standalone: true,
})
export class ConfirmProductComponent implements OnInit {
    productData: any;

    constructor(
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.productData = this.productService.getProductData();
        if (!this.productData) {
            // Redirect to add-product if no product data is available
            // this.router.navigate(['/admin/products/add-product/add']);
        }
    }

    confirmProduct() {
        this.productService.confirmProduct(this.productData).subscribe(
            (response) => {
                // Handle successful confirmation
                this.router.navigate(['/admin/products']);
            },
            (error) => {
                // Handle confirmation error
                console.error('Confirmation failed', error);
            }
        );
    }

    goBack() {
        this.router.navigate(['/admin/products/add-product/review']);
    }

    addAnotherProduct() {
        this.productService.setProductData(null); // Clear the current product data
        this.router.navigate(['/admin/products/add-product/add']);
    }
}
