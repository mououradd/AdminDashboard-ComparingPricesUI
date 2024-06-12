import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category, Brand, SubCategory } from '../../models/category';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableModule, ButtonModule, DialogModule, InputTextModule, FormsModule, ToastModule, ToolbarModule],
  providers:[MessageService],
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.scss']
})
export class CatagoryComponent implements OnInit {
  categories: Category[] = [];
  expandedRows: { [key: string]: boolean } = {};
  isExpanded = false;
  loading = true;

  // Dialog control variables
  categoryDialog: boolean = false;
  deleteCategoryDialog: boolean = false;
  deleteCategoriesDialog: boolean = false;

  category: Category = { id: 0, name_Local: '', name_Global: '', brands: [], subCategories: [] };
  selectedCategories: Category[] = [];
  submitted: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.categories.forEach(category => {
        if (category && category.name_Global) {
          this.expandedRows[category.name_Global] = true;
        }
      });
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  getSubCategories(category: Category): SubCategory[] {
    return category.subCategories || [];
  }

  getBrands(category: Category): Brand[] {
    return category.brands || [];
  }

  openNew() {
    this.category = { id: 0, name_Local: '', name_Global: '', brands: [], subCategories: [] };
    this.submitted = false;
    this.categoryDialog = true;
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
  }

  confirmDelete() {
    this.deleteCategoryDialog = false;
    this.categoryService.deleteCategory(this.category.id).subscribe(() => {
      this.loadData();
    });
  }

  deleteSelectedCategories() {
    this.deleteCategoriesDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteCategoriesDialog = false;
    this.selectedCategories.forEach(category => {
      this.categoryService.deleteCategory(category.id).subscribe(() => {
        this.loadData();
      });
    });
    this.selectedCategories = [];
  }

  saveCategory() {
    this.submitted = true;
    if (this.category.name_Global.trim()) {
      if (this.category.id) {
        this.categoryService.updateCategory(this.category).subscribe(() => {
          this.loadData();
        });
      } else {
        this.categoryService.addCategory(this.category).subscribe(() => {
          this.loadData();
        });
      }
      this.categoryDialog = false;
      this.category = { id: 0, name_Local: '', name_Global: '', brands: [], subCategories: [] };
    }
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }
}
