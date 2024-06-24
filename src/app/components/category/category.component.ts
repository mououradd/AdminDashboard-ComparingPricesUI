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
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    categories: Category[] = [];
    expandedRows: { [key: string]: boolean } = {};
    isExpanded = false;
    loading = true;

    // Dialog control variables
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
        logo: '',
        logoUrl: '',
        categoryId: 0,
    };
    selectedCategories: Category[] = [];
    selectedSubCategories: SubCategory[] = [];
    selectedBrands: Brand[] = [];
    submitted: boolean = false;

    // Track the category ID for subcategory operations
    currentCategoryId: number | null = null;
    isEditSubCategory: boolean = false; // Track if we are editing a subcategory
    isEditBrand: boolean = false;

    constructor(
        private categoryService: CategoryService,
        private subCategoryService: SubCategoryService,
        private brandService: BrandService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.categoryService.getCategories().subscribe((categories) => {
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

    getBrands(category: Category): Brand[] {
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
        }; // Resetting the subCategory object
        this.currentCategoryId = categoryId; // Store the current category ID for context
        this.isEditSubCategory = false; // Mark as adding new subcategory
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
            logo: '',
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
        this.isEditSubCategory = true; // Mark as editing existing subcategory
        this.subCategoryDialog = true;
    }

    editBrand(brand: Brand, brandId: number) {
        this.brand = { ...brand };
        this.currentCategoryId = brand.categoryId;
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

    deleteBrand(brand: Brand) {
        this.deleteBrandDialog = true;
        this.brand = { ...brand };
    }

    confirmDeleteCategory() {
        this.deleteCategoryDialog = false;
        this.categoryService.deleteCategory(this.category.id).subscribe(() => {
            this.loadData();
        });
    }

    confirmDeleteSubCategory() {
        this.deleteSubCategoryDialog = false;
        this.subCategoryService
            .deleteSubCategory(this.subCategory.id)
            .subscribe(() => {
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
                this.categoryService
                    .updateCategory(this.category)
                    .subscribe(() => {
                        this.loadData();
                    });
            } else {
                this.categoryService
                    .addCategory(this.category)
                    .subscribe(() => {
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

    // save subcategory
    saveSubCategory() {
        console.log('save this subcategory', this.subCategory);

        this.submitted = true;
        if (this.subCategory.name_Global.trim()) {
            if (this.isEditSubCategory) {
                // We are in edit mode
                this.subCategory.categoryId = this.currentCategoryId || 0; // Ensure we use the current category ID
                console.log('Updating subcategory:', this.subCategory); // Debug log
                console.log(
                    'API URL:',
                    `${this.subCategoryService.apiUrl}/${this.subCategory.id}`
                ); // Log the full API URL

                this.subCategoryService
                    .updateSubCategory(this.subCategory)
                    .subscribe({
                        next: () => {
                            this.loadData();
                        },
                        error: (err) => {
                            console.error('Update Subcategory Error:', err); // Log error details
                        },
                    });
            } else {
                // We are in add mode
                this.subCategory.categoryId = this.currentCategoryId || 0; // Ensure we use the current category ID
                this.subCategoryService
                    .addSubCategory(this.subCategory)
                    .subscribe(() => {
                        this.loadData();
                    });
            }
            this.subCategoryDialog = false;
            this.subCategory = {
                id: 0,
                name_Local: '',
                name_Global: '',
                categoryId: 0,
            }; // Reset subCategory object
        }
    }

    // // save brand
    // saveBrand() {
    //     console.log('save this brand', this.brand);
    //     this.submitted = true;
    //     if (this.brand.name_Global.trim()) {
    //         if (this.isEditBrand) {
    //             this.brand.categoryId = this.currentCategoryId || 0;
    //             //fix error in the below line

    //             this.brandService.updateBrand(this.brand).subscribe({
    //                 next: () => {
    //                     this.loadData();
    //                 },
    //                 error: (err) => {
    //                     console.error('Update Brand Error:', err);
    //                 },
    //             });
    //         } else {
    //             this.brand.categoryId = this.currentCategoryId || 0;
    //             this.brandService.addBrand(this.brand).subscribe(() => {
    //                 this.loadData();
    //             });
    //         }
    //         this.brandDialog = false;
    //         this.brand = {
    //             id: 0,
    //             name_Local: '',
    //             name_Global: '',
    //             description_Local: '',
    //             description_Global: '',
    //             logo: '',
    //             logoUrl: '',
    //             categoryId: 0,
    //         };
    //     }
    // }
    // saveBrand function in CategoryComponent

saveBrand() {
    console.log('save this brand', this.brand); // Debug: Log the brand being saved
    this.submitted = true;

    if (this.brand.name_Global.trim()) { // Ensure there's a global name
        // Check if it's an edit or a new brand
        if (this.isEditBrand) {
            // Editing existing brand
            this.brand.categoryId = this.currentCategoryId || 0; // Ensure we have the correct category ID

            this.brandService.updateBrand(this.brand).subscribe({
                next: () => {
                    console.log('Brand updated successfully'); // Debug: Confirm update success
                    this.loadData(); // Reload data to refresh the view
                },
                error: (err) => {
                    console.error('Update Brand Error:', err); // Log the error details
                }
            });
        } else {
            // Adding a new brand
            this.brand.categoryId = this.currentCategoryId || 0; // Ensure we have the correct category ID

            this.brandService.addBrand(this.brand).subscribe({
                next: () => {
                    console.log('Brand added successfully'); // Debug: Confirm addition success
                    this.loadData(); // Reload data to refresh the view
                },
                error: (err) => {
                    console.error('Add Brand Error:', err); // Log the error details
                }
            });
        }

        // Close the dialog and reset the brand object
        this.brandDialog = false;
        this.resetBrand();
    }
}

// Function to reset the brand object
resetBrand() {
    this.brand = {
        id: 0,
        name_Local: '',
        name_Global: '',
        description_Local: '',
        description_Global: '',
        logo: '',
        logoUrl: '',
        categoryId: 0,
    };
}


    hideDialog() {
        console.log('hide dialog');
        this.categoryDialog = false;
        this.subCategoryDialog = false;
        this.brandDialog = false;
        this.submitted = false;
    }

    // brand logo is text not an image
    // (change)="onFileSelected($event)"
    // onFileSelected(event: any) {
    //     const file = event.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             this.brand.logo = reader.result as string;
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }
}
