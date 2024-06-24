import { Category, SubCategory } from './../../../models/category';
import { SelectItem, Message } from 'primeng/api';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../models/product';
import { StepsMenuComponent } from '../../steps-menu/steps-menu.component';
import { ScrapingServiceService } from '../../../services/scraping-service.service';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
// Toaster
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { validUrlValidator } from './validUrl';
@Component({
    selector: 'app-add-product',
    standalone: true,
    templateUrl: './add-product.component.html',
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        StepsMenuComponent,
        DropdownModule,
        ProgressSpinnerModule,
        LoadingDialogComponent,
        ToastModule,
        InputMaskModule,
        InputTextareaModule,
        MessagesModule,
        MessageModule,
        InputGroupAddonModule,
        InputGroupModule,
        DropdownModule,
        ReactiveFormsModule,
    ],
    providers: [MessageService],
})
export class AddProductComponent {
    productForm: FormGroup;
    Category: any;
    SubCategory: any;
    Brand: any;
    Categories: any;
    isLoading: boolean = true;
    isScraping: boolean = false;
    Furls: AbstractControl<any>[];

    constructor(
        private fb: FormBuilder,
        public scrapingService: ScrapingServiceService,
        public router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.productForm = this.fb.group({
            name_Global: ['', Validators.required],
            description_Global: [
                '',
                [Validators.required, Validators.minLength(10)],
            ],
            name_Local: ['', Validators.required],
            description_Local: [
                '',
                [Validators.required, Validators.minLength(10)],
            ],
            Category: [null, Validators.required],
            SubCategory: [null, Validators.required],
            Brand: [null, Validators.required],
            urls: this.fb.array([
                this.fb.group({
                    url: ['', [Validators.required, validUrlValidator()]],
                }),
            ]),
        });
        this.Furls = (this.productForm.get('urls') as FormArray).controls;

        this.scrapingService.GetCategories().subscribe(
            (data) => {
                this.isLoading = false;
                this.Categories = data;
                this.Category = this.Categories[0];
            },
            (error) => {
                this.show(
                    'error',
                    'Error Connecting to the Backend server. Please try again later.'
                );
            }
        );
    }

    get urls(): FormArray {
        console.log(this.productForm.get('urls'));
        return this.productForm.get('urls') as FormArray;
    }

    onCategoryChange() {
        this.scrapingService.scrapingData.productPostDTO.subCategoryId =
            this.productForm.get('Category').value.id;
    }

    onSubCategoryChange() {
        this.scrapingService.scrapingData.productPostDTO.subCategoryId =
            this.productForm.get('SubCategory').value.id;
    }

    onBrandChange() {
        this.scrapingService.scrapingData.productPostDTO.brandId =
            this.productForm.get('Brand').value.id;
    }

    addUrl(): void {
        this.urls.push(
            this.fb.group({
                url: ['', [Validators.required, validUrlValidator()]],
            })
        );
    }

    deleteUrl(index: number): void {
        this.urls.removeAt(index);
    }

    show(severity: string, message: string = 'Please wait...') {
        this.messageService.add({
            severity: severity,
            summary: severity,
            detail: message,
        });
    }

    isValidUrl(url: any): boolean {
        if (typeof url !== 'string') {
            return false;
        }
        const validDomains = [
            'amazon.eg',
            'noon',
            'aliexpress',
            'jarir',
            'extra',
            'amazon.sa',
        ];
        return validDomains.some((domain) => url.includes(domain));
    }

    isNextButtonEnabled(): boolean {
        return (
            this.productForm.valid &&
            this.urls.controls.every((urlControl) =>
                this.isValidUrl(urlControl.value.url)
            )
        );
    }

    onSubmit() {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill all the required fields properly.',
            });
            return;
        }
        this.scrapingService.scrapingData.productPostDTO = {
            name_Local: this.productForm.value.name_Local,
            name_Global: this.productForm.value.name_Global,
            description_Local: this.productForm.value.description_Local,
            description_Global: this.productForm.value.description_Global,
            subCategoryId: this.productForm.value.SubCategory.id,
            brandId: this.productForm.value.Brand.id,
        };
        this.isScraping = true;
        console.log(this.scrapingService.scrapingData.productPostDTO);

        this.scrapingService
            .GetData(
                this.productForm.value.urls.map((urlGroup) => urlGroup.url)
            )
            .subscribe(
                (data) => {
                    this.isScraping = false;
                    if (data.length > 0) {
                        this.scrapingService.scrapingData.productDetailDTO =
                            data;
                        this.scrapingService.urls =
                            data.map(
                                (x) => x.productlink1
                            );
                        console.log(
                            this.scrapingService.scrapingData.productDetailDTO
                        );
                        console.log(this.scrapingService.urls);
                        this.router.navigate([
                            '/admin/products/add-product/review',
                        ]);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No data found for any of the given URLs',
                        });
                        console.error('No data found for the given URLs');
                    }
                },
                (error) => {
                    this.isScraping = false;
                    console.error('Error', error);
                }
            );
    }

    back() {
        this.router.navigate(['/admin/products']);
    }
}
