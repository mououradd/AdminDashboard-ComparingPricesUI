import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Brand } from '../../models/Brand';
import { BrandService } from '../../services/brand.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { User } from '../../models/User';


import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    //styleUrls: ['./dashboard.component.css'], // Added CSS file path
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        ButtonModule,
        StyleClassModule,
        PanelMenuModule,
        RouterModule,
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    productCount: number = 0; // Initialized productCount
    BrandCount: number = 0; // Initialized BrandCount
    categoryCount: number = 0; // Initialized categoryCount
    userCount: number = 0; // Initialized userCount

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(private productService: ProductService, public layoutService: LayoutService, private brandService: BrandService, private categoryService: CategoryService, private UsersService: UsersService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);

        // Fetch counts and then update the chart
        Promise.all([
            this.getProductCount(),
            this.getBrandCount(),
            this.getCategoryCount() ,
            this.getUserCount(),
            // Ensure this method name is correctly cased
        ]).then((counts) => {
            // Assuming getProductCount, getBrandCount, and getCategoryCount now resolve to their respective counts
            // Update the state with these counts
            const [productCount, brandCount, categoryCount, userCount] = counts;
            this.productCount = productCount;
            this.BrandCount = brandCount;
            this.categoryCount = categoryCount;
            this.userCount = userCount;

            // Now that the state is updated, call initChart
            this.initChart();
        });

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    getProductCount(): Promise<number> { // Updated getProductCount method return type
        return this.productService.getProductCount()
        .then(count => {
            this.productCount = count;
            return count; // Return the count
        })
        .catch(error => {
            console.error('Error fetching product count:', error);
            throw error; // Throw the error
        });
    }
    getBrandCount(): Promise<number> { // Added getBrandCount method
        return this.brandService.getBrandCount()
        .then(count => {
            this.BrandCount = count;
            return count; // Return the count
        })
        .catch(error => {
            console.error('Error fetching brand count:', error);
            throw error; // Throw the error
        });
    }
    getCategoryCount(): Promise<number> { // Added getcategoryCount method
        return this.categoryService.getCategoryCount()
        .then(count => {
            this.categoryCount = count;
            return count; // Return the count
        })
        .catch(error => {
            console.error('Error fetching category count:', error);
            throw error; // Throw the error
        });
    }
    getUserCount(): Promise<number> { // Added getUserCount method
        return this.UsersService.getUserCount()
        .then(count => {
            this.productCount = count;
            return count; // Return the count
        })
        .catch(error => {
            console.error('Error fetching user count:', error);
            throw error; // Throw the error
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Products', 'Brands', 'Categories'],
            datasets: [
                {
                    label: 'Counts',
                    data: [this.productCount, this.BrandCount, this.categoryCount],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--bluegray-700'),
                        documentStyle.getPropertyValue('--green-600'),
                        documentStyle.getPropertyValue('--orange-500')
                    ],
                    borderColor: [
                        documentStyle.getPropertyValue('--surface-d'),
                        documentStyle.getPropertyValue('--surface-d'),
                        documentStyle.getPropertyValue('--surface-d')
                    ],
                    borderWidth: 1
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
