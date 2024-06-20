import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { SubCategoryService } from '../../services/subcategory.service';
import { Category, SubCategory, Brand } from '../../models/category';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, HttpClientModule, TableModule, ButtonModule, DialogModule, InputTextModule, FormsModule, ToastModule, ToolbarModule],
    providers: [MessageService],
    templateUrl: './catagory.component.html',
    styleUrls: ['./catagory.component.scss']
})
export class CategoryComponent implements OnInit {
    categories: Category[] = [];
    expandedRows: { [key: string]: boolean } = {};
    isExpanded = false;
    loading = true;

    // Dialog control variables
    categoryDialog: boolean = false;
    subCategoryDialog: boolean = false;
    deleteCategoryDialog: boolean = false;
    deleteSubCategoryDialog: boolean = false;

    category: Category = { id: 0, name_Local: '', name_Global: '', brands: [], subCategories: [] };
    subCategory: SubCategory = { name_Local: '', name_global: '', categoryId: 0 };
    selectedCategories: Category[] = [];
    selectedSubCategories: SubCategory[] = [];
    submitted: boolean = false;

    // Track the category ID for subcategory operations
    currentCategoryId: number | null = null;
    isEditSubCategory: boolean = false; // Track if we are editing a subcategory

    constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService) { }

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
                if (category && category.id) {
                    this.expandedRows[category.id] = true;
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

    openNewCategory() {
        this.category = { id: 0, name_Local: '', name_Global: '', brands: [], subCategories: [] };
        this.submitted = false;
        this.categoryDialog = true;
    }

    openNewSubCategory(categoryId: number) {
        this.subCategory = { name_Local: '', name_global: '', categoryId: categoryId }; // Resetting the subCategory object
        this.currentCategoryId = categoryId; // Store the current category ID for context
        this.isEditSubCategory = false; // Mark as adding new subcategory
        this.submitted = false;
        this.subCategoryDialog = true;
    }

    editCategory(category: Category) {
        this.category = { ...category };
        this.categoryDialog = true;
    }

    editSubCategory(subCategory: SubCategory, categoryId: number) {
        this.subCategory = { ...subCategory };
        this.currentCategoryId = categoryId;
        this.isEditSubCategory = true; // Mark as editing existing subcategory
        this.subCategoryDialog = true;
    }

    deleteCategory(category: Category) {
        this.deleteCategoryDialog = true;
        this.category = { ...category };
    }

    deleteSubCategory(subCategory: SubCategory) {
        this.deleteSubCategoryDialog = true;
        this.subCategory = { ...subCategory };
    }

    confirmDeleteCategory() {
        this.deleteCategoryDialog = false;
        this.categoryService.deleteCategory(this.category.id).subscribe(() => {
            this.loadData();
        });
    }

    confirmDeleteSubCategory() {
        this.deleteSubCategoryDialog = false;
        this.subCategoryService.deleteSubCategory(this.subCategory.categoryId).subscribe(() => {
            this.loadData();
        });
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

    saveSubCategory() {
        this.submitted = true;
        if (this.subCategory.name_global.trim()) {
            if (this.isEditSubCategory) {
                // We are in edit mode
                this.subCategoryService.updateSubCategory(this.subCategory).subscribe(() => {
                    this.loadData();
                });
            } else {
                // We are in add mode
                this.subCategory.categoryId = this.currentCategoryId || 0; // Ensure we use the current category ID
                this.subCategoryService.addSubCategory(this.subCategory).subscribe(() => {
                    this.loadData();
                });
            }
            this.subCategoryDialog = false;
            this.subCategory = { name_Local: '', name_global: '', categoryId: 0 }; // Reset subCategory object
        }
    }

    hideDialog() {
        this.categoryDialog = false;
        this.subCategoryDialog = false;
        this.submitted = false;
    }
}
