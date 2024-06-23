import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { Brand, Category } from '../../models/Brand';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableModule, ButtonModule, DialogModule, InputTextModule, FormsModule, ToastModule, ToolbarModule],
  providers:[MessageService],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  expandedRows: { [key: string]: boolean } = {};
  isExpanded = false;
  loading = true;

  // Dialog control variables
  brandDialog: boolean = false;
  deleteBrandDialog: boolean = false;
  deleteBrandsDialog: boolean = false;

  brand: Brand = { id: 0, name_Local: '', name_Global: '', description_Local: '', description_Global: '', logo: null, categories: [] };
  selectedBrands: Brand[] = [];
  submitted: boolean = false;
deleteCategoriesDialog: any;
category: any;
deleteCategoryDialog: any;
categoryDialog: any;

  constructor(private brandService: BrandService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.brandService.getBrands().subscribe(brands => {
      this.brands = brands;
      this.loading = false;
    });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.brands.forEach(brand => {
        if (brand && brand.name_Local) {
          this.expandedRows[brand.name_Local] = true;
        }
      });
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  getCategories(brand: Brand): Category[] {
    return brand.categories || [];
  }

  openNew() {
    this.brand = { id: 0, name_Local: '', name_Global: '', description_Local: '', description_Global: '', logo: null, categories: [] };
    this.submitted = false;
    this.brandDialog = true;
  }

  editBrand(brand: Brand) {
    this.brand = { ...brand };
    this.brandDialog = true;
  }

  deleteBrand(brand: Brand) {
    this.deleteBrandDialog = true;
    this.brand = { ...brand };
  }

  confirmDelete() {
    this.deleteBrandDialog = false;
    this.brandService.deleteBrand(this.brand.id).subscribe(() => {
      this.loadData();
    });
  }

  deleteSelectedBrands() {
    this.deleteBrandsDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteBrandsDialog = false;
    this.selectedBrands.forEach(brand => {
      this.brandService.deleteBrand(brand.id).subscribe(() => {
        this.loadData();
      });
    });
    this.selectedBrands = [];
  }

  saveBrand() {
    debugger;
    this.submitted = true;
    if (this.brand.name_Local.trim()) {
      if (this.brand.id) {
        this.brandService.updateBrand(this.brand).subscribe(() => {
          this.loadData();
        });
      } else {
        this.brandService.addBrand(this.brand).subscribe(() => {
          this.loadData();
        });
      }
      this.brandDialog = false;
    this.brand = { id: 0, name_Local: '', name_Global: '', description_Local: '', description_Global: '', logo: null, categories: [] };
    }
  }

  hideDialog() {
    this.brandDialog = false;
    this.submitted = false;
  }
}
