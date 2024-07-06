import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SponsoredProduct } from '../../models/product'; // Adjust the import path as necessary
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // Corrected import
import { RouterModule } from '@angular/router';
import { SponsoredProductsService } from '../../services/sponsored-products.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-sponsored-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    ToastModule,
    RouterModule,
  ],
  templateUrl: './sponsored-product.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ],
})
export class SponsoredProductComponent implements OnInit, ControlValueAccessor {

    sponsoredProducts: SponsoredProduct[] = [];
    productDialog: boolean = false;
    product: SponsoredProduct | null = null;
    selectedProducts: SponsoredProduct[] = [];
    deleteConfirmation: boolean = false;

    constructor(
      private sponsoredProductsService: SponsoredProductsService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService
    ) {}

    ngOnInit() {
      this.loadSponsoredProducts();
    }

    loadSponsoredProducts() {
      this.sponsoredProductsService.getSponsoredProducts().subscribe(products => {
        this.sponsoredProducts = products;
      });
    }

    openNew() {
      this.product = {
        id: 0,
        cost: 0,
        startDate: new Date(),
        duration: 0,
        prodDetId: 0,
      };
      this.productDialog = true;
    }

    editProduct(product: SponsoredProduct) {
      this.product = { ...product };
      this.productDialog = true;
    }

    deleteProduct(product: SponsoredProduct) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.prodDetId + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.sponsoredProductsService.deleteSponsoredProduct(product.id).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.loadSponsoredProducts();
          });
        }
      });
    }

    saveProduct() {
      if (this.product.id === 0) {
        this.sponsoredProductsService.addSponsoredProduct(this.product).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Saved', life: 3000 });
          this.loadSponsoredProducts();
        });
      } else {
        this.sponsoredProductsService.updateSponsoredProduct(this.product).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.loadSponsoredProducts();
        });
      }
      this.productDialog = false;
    }

    hideDialog() {
      this.productDialog = false;
    }

    // Implementing ControlValueAccessor methods
    writeValue(value: any) {}
    registerOnChange(fn: any) {}
    registerOnTouched(fn: any) {}
    setDisabledState?(isDisabled: boolean) {}
  }
