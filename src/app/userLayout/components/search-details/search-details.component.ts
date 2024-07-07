import { Component, ViewEncapsulation } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { SearchService } from 'src/app/services/search.service';
import { Brand } from 'src/app/models/Brand';
import { SkeletonModule } from 'primeng/skeleton';
import { ActivatedRoute } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from 'src/app/models/category';
import { PaginatorModule } from 'primeng/paginator';
@Component({
    selector: 'app-search-details',
    standalone: true,

    imports: [
        PanelMenuModule,
        MultiSelectModule,
        ReactiveFormsModule,
        FormsModule,
        DividerModule,
        RatingModule,
        CommonModule,
        SliderModule,
        InputNumberModule,
        SkeletonModule,
        SidebarModule,
        ButtonModule,
        CheckboxModule,
        DropdownModule,
        PaginatorModule
    ],
    templateUrl: './search-details.component.html',
    styleUrl: './search-details.component.scss',
})
export class SearchDetailsComponent {
    foo() {
        console.log(this.selectedCategory.value);
    }
    first: number = 0;

    rows: number = 10;
    categoryOptions = [];
    subCategoryOptions = [];
    brandsOptions = [];
    domainOptions = [];
    sortOptions = [
        { name: 'None', value: 0 },
        { name: 'Hight to Low', value: 1 },
        { name: 'Low to High', value: 2 },
        { name: 'Most Viewed', value: 3 },
        { name: 'Most Popular', value: 4 },
        { name: 'Most  Favorite', value: 5 },
        { name: 'Newest', value: 6 },
        { name: 'Oldest', value: 7 },
    ];
    sponser: boolean = false;
    sidebarVisible: boolean = false;
    selectedSort = new FormControl('');
    rangeValues = new FormControl([0, 10000]);
    selectedBrand = new FormControl('');
    selectedSubCategory = new FormControl('');
    selectedCategory = new FormControl('');
    selectedDomain = new FormControl('');
    searchResult!: Brand[];
    fav: boolean = false;
    searchValue: string = '';
    constructor(
        private search: SearchService,
        private activatedRoute: ActivatedRoute
    ) {}
    ngOnInit() {
        this.searchValue = this.activatedRoute.snapshot.queryParams['q'];
        this.getAllSearchRes({ searchParam: this.searchValue });
        this.search.currentSearchQuery$.subscribe((query) => {
            if (query) {
                this.searchValue = query;
                this.getAllSearchRes({ searchParam: this.searchValue });
            }
        });
        this.getAllDomains();
        this.getAllCat();

    }
    getAllDomains() {
        this.search.gatDomains().subscribe({
            next: (data: any) => {
                this.domainOptions = data;
            },
        });
    }
    getAllCat(){
        this.search.getCategories().subscribe({
            next:(data:Category[])=>{
                this.categoryOptions = data;
            }
        })
    }
    getAllSubcategory(){
        this.subCategoryOptions = this.selectedCategory.value['subCategories'];
    }
getAllBrands(){
    this.brandsOptions = this.selectedCategory.value['brands'];

}
    getAllSearchRes(params: {
        searchParam: string;
        minPrice?: number;
        maxPrice?: number;
        isFeatured?: boolean;
        sortedBy?: number;
        domainID?: number;
        categoryID?:number;
        subCatId?:number;
        brandId?:number;
        pageNum?:number;
        pageSize?:number;
    }) {
        this.search
            .getSearchData({
                searchQuery: params.searchParam,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice,
                isFeatured: params.isFeatured,
                sortedBy: params.sortedBy,
                domainID: params.domainID,
                catId:params.categoryID,
                subCatId:params.subCatId,
                brandId:params.brandId,
                pageNum:params.pageNum,
                pageSize:params.pageSize,
            })
            .subscribe({
                next: (data) => {
                    this.searchResult = data;
                },
            });
    }
    updateSlider(event: any, index: number) {

        const newValue = parseFloat(event);


        const newRange = [...this.rangeValues.value];
        newRange[index] = newValue;

        this.rangeValues.setValue(newRange);
    }

    changeFav(itemId: number) {
        this.fav = !this.fav;
    }
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
