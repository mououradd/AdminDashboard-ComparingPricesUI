import { Component, OnInit, NgModule } from '@angular/core';
import { Product } from '../../models/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CrudRoutingModule } from 'src/app/demo/components/pages/crud/crud-routing.module';
import { AddProductComponent } from '../ProductDashboard/add-product/add-product.component';
import { Router } from '@angular/router';
interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: "app-Products",
    templateUrl: './products.component.html',
    standalone: true,
    imports: [
        AddProductComponent,
        CommonModule,
        CrudRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule
    ],
    providers: [MessageService,ProductService]
})
export class ProductsComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    expandedRows: expandedRows = {};
    
    isExpanded: boolean = false;

    idFrozen: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService, private router: Router) { }

    ngOnInit() {
        this.productService.getAllProducts().subscribe({next:(Response:Product[])=>{
            this.products=Response
        }});
        this.cols = [
            { field: 'Name', header: 'Name' },
            { field: 'Image', header: 'Image' },
            { field: 'Description', header: 'Description' },
            { field: 'Category', header: 'Category' },
            { field: 'Brand', header: 'Brand' },
            { field: 'Delete', header: 'Delete' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        // this.productDialog = true;
        this.router.navigate(['/admin/products/add-product/add']);
    }
    
    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        const selectedProductIds = this.selectedProducts.map(product => product.productId);
        this.productService.bulkDeleteProducts(selectedProductIds).subscribe({
            next: () => {
                this.products = this.products.filter(product => !this.selectedProducts.includes(product));
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
                this.selectedProducts = [];
                this.deleteProductsDialog = false;
            },
            error: (err) => {
                console.error(err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Products', life: 3000 });
            }
        });
    }
    
    confirmDelete() {
        this.productService.deleteProduct(this.product.productId!).subscribe({
          next: () => {
            this.products = this.products.filter(val => val.productId !== this.product.productId);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.product = {};
            this.deleteProductDialog = false;
          },
          error: (err) => console.error(err)
        });
    }


    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].productId === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        debugger;
        console.log((event.target as HTMLInputElement).value)
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    expandAll() {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) {
          this.products.forEach(product => {
            if (product && product.productId) {
              this.expandedRows[product.productId] = true;
            }
          });
        } else {
          this.expandedRows = {};
        }
    }
    
    onRowToggle(event: any, product: Product) {
        this.expandedRows[product.productId] = event.data;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    clear(table: Table) {
        table.clear();
        (document.getElementById('globalFilter') as HTMLInputElement).value = '';
    }
}
