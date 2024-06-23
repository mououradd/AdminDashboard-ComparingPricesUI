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
import { BrandService } from 'src/app/services/brand.service';
import { Category, SubCategory, Brand } from '../../models/category';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        ToastModule,
        ToolbarModule,
    ],
    providers: [MessageService],
    templateUrl: './catagory.component.html',
    styleUrls: ['./catagory.component.scss'],
})
export class CategoryComponent implements OnInit {
    categories: Category[] = [];
    expandedRows: { [key: string]: boolean } = {};
    isExpanded = false;
    loading = true;

    categoryDialog: boolean = false;
    subCategoryDialog: boolean = false;
    brandDialog: boolean = false;
    deleteCategoryDialog: boolean = false;
    deleteSubCategoryDialog: boolean = false;
    deleteBrandDialog: boolean = false;

    category: Category = {
        id: 0,
        name_Local: '',
        name_Global: '',
        brands: [],
        subCategories: [],
    };
    subCategory: SubCategory = {
        id: 0,
        name_Local: '',
        name_Global: '',
        categoryId: 0,
    };
    brand: Brand = {
        id: 0,
        name_Local: '',
        name_Global: '',
        description_Local: '',
        description_Global: '',
        Logo: '',
        logoUrl: '',
        categoryId: 0,
    };
    selectedCategories: Category[] = [];
    selectedSubCategories: SubCategory[] = [];
    selectedBrands: Brand[] = [];
    submitted: boolean = false;

    currentCategoryId: number | null = null;
    isEditSubCategory: boolean = false;
    isEditBrand: boolean = false;

    constructor(
        private categoryService: CategoryService,
        private subCategoryService: SubCategoryService,
        private brandService: BrandService
    ) {}

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.categoryService.getCategories().subscribe((categories) => {
            console.log('Loaded categories with brands:', categories); // Log the categories
            this.categories = categories;
            this.loading = false;
        });
    }

    expandAll() {
        if (!this.isExpanded) {
            this.categories.forEach((category) => {
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

    // getBrands(category: Category): Brand[] {
    //     console.log('Original brands data:', category.brands);
    //     const processedBrands = category.brands.map((brand) => {
    //         console.log('Processing brand:', brand);
    //         return {
    //             ...brand,
    //             Logo: brand.Logo
    //         };
    //     }) || [];
    //     console.log('Processed brands:', processedBrands);
    //     return processedBrands;
    // }
    getBrands(category: Category): Brand[] {
        // log the logo url
        category.brands.forEach((brand) => {
            // log the logo
            console.log(brand);
        });
        return category.brands || [];
    }

    openNewCategory() {
        this.category = {
            id: 0,
            name_Local: '',
            name_Global: '',
            brands: [],
            subCategories: [],
        };
        this.submitted = false;
        this.categoryDialog = true;
    }

    openNewSubCategory(categoryId: number) {
        this.subCategory = {
            id: 0,
            name_Local: '',
            name_Global: '',
            categoryId: categoryId,
        };
        this.currentCategoryId = categoryId;
        this.isEditSubCategory = false;
        this.submitted = false;
        this.subCategoryDialog = true;
    }

    openNewBrand(categoryId: number) {
        this.brand = {
            id: 0,
            name_Local: '',
            name_Global: '',
            description_Local: '',
            description_Global: '',
            Logo: '',
            logoUrl: '',
            categoryId: categoryId,
        };
        this.currentCategoryId = categoryId;
        this.isEditBrand = false;
        this.submitted = false;
        this.brandDialog = true;
    }

    editCategory(category: Category) {
        this.category = { ...category };
        this.categoryDialog = true;
    }

    editSubCategory(subCategory: SubCategory, categoryId: number) {
        this.subCategory = { ...subCategory };
        this.currentCategoryId = categoryId;
        this.isEditSubCategory = true;
        this.subCategoryDialog = true;
    }

    editBrand(brand: Brand, brandId: number) {
        this.brand = { ...brand };
        this.currentCategoryId = brandId;
        this.isEditBrand = true;
        this.brandDialog = true;
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
        this.subCategoryService.deleteSubCategory(this.subCategory.id).subscribe(() => {
            this.loadData();
        });
    }

    confirmDeleteBrand() {
        this.deleteBrandDialog = false;
        this.brandService.deleteBrand(this.brand.id).subscribe(() => {
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
            this.category = {
                id: 0,
                name_Local: '',
                name_Global: '',
                brands: [],
                subCategories: [],
            };
        }
    }

    saveSubCategory() {
        this.submitted = true;
        if (this.subCategory.name_Global.trim()) {
            if (this.isEditSubCategory) {
                this.subCategory.categoryId = this.currentCategoryId || 0;
                this.subCategoryService.updateSubCategory(this.subCategory).subscribe({
                    next: () => {
                        this.loadData();
                    },
                    error: (err) => {
                        console.error('Update Subcategory Error:', err);
                    },
                });
            } else {
                this.subCategory.categoryId = this.currentCategoryId || 0;
                this.subCategoryService.addSubCategory(this.subCategory).subscribe(() => {
                    this.loadData();
                });
            }
            this.subCategoryDialog = false;
            this.subCategory = {
                id: 0,
                name_Local: '',
                name_Global: '',
                categoryId: 0,
            };
        }
    }

    saveBrand() {
        console.log('save this brand', this.brand);
        this.submitted = true;
        if (this.brand.name_Global.trim()) {
            if (this.isEditBrand) {
                this.brand.categoryId = this.currentCategoryId || 0;
                this.brandService.updateBrand(this.brand).subscribe({
                    next: () => {
                        this.loadData();
                    },
                    error: (err) => {
                        console.error('Update Brand Error:', err);
                    },
                });
            } else {
                this.brand.categoryId = this.currentCategoryId || 0;
                this.brandService.addBrand(this.brand).subscribe(() => {
                    this.loadData();
                });
            }
            this.brandDialog = false;
            this.brand = {
                id: 0,
                name_Local: '',
                name_Global: '',
                description_Local: '',
                description_Global: '',
                Logo: '',
                logoUrl: '',
                categoryId: 0,
            };
        }
    }

    hideDialog() {
        this.categoryDialog = false;
        this.subCategoryDialog = false;
        this.brandDialog = false;
        this.submitted = false;
    }
}
