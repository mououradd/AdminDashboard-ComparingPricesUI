import { Component, Output } from '@angular/core';
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
import { ConfirmDialogComponent } from '../Confirm-Dialog/confirm-dialog.component';
@Component({
    selector: 'app-add-product',
    standalone: true,
    templateUrl: './add-product.component.html',
    providers: [MessageService],
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
        ConfirmDialogComponent,
    ],
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
    @Output() isConfirm: boolean = false;
    failed = [];
    constructor(
        private fb: FormBuilder,
        public scrapingService: ScrapingServiceService,
        public router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        // if (this.scrapingService.isScrapingData) {
        //     // Refresh
        //     this.scrapingService.isScrapingData = false;
        //     window.location.reload();
        // }

        const savedState = this.scrapingService.getFormState();

        this.productForm = this.fb.group({
            name_Global: [savedState?.name_Global || '', Validators.required],
            description_Global: [
                savedState?.description_Global || '',
                [Validators.required, Validators.minLength(10)],
            ],
            name_Local: [savedState?.name_Local || '', Validators.required],
            description_Local: [
                savedState?.description_Local || '',
                [Validators.required, Validators.minLength(10)],
            ],
            Category: [savedState?.Category || null, Validators.required],
            SubCategory: [savedState?.SubCategory || null, Validators.required],
            Brand: [savedState?.Brand || null, Validators.required],
            urls: this.fb.array(
                savedState?.urls?.map((url) =>
                    this.fb.group({
                        url: [
                            url.url || '',
                            [Validators.required, validUrlValidator()],
                        ],
                    })
                ) || [
                    this.fb.group({
                        url: ['', [Validators.required, validUrlValidator()]],
                    }),
                ]
            ),
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
    onCategoryChange() {
        this.Category = this.productForm.get('Category').value;
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

    get urls(): FormArray {
        console.log(this.productForm.get('urls'));
        return this.productForm.get('urls') as FormArray;
    }

    addUrl(): void {
        this.urls.push(
            this.fb.group({
                url: ['', [Validators.required, validUrlValidator()]],
            })
        );
    }

    deleteUrl(index: number): void {
        if (this.urls.length === 1) {
            return;
        }
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
        // Cancel Form Submission Dont clear form values
        this.productForm.markAsPristine();
        this.scrapingService.saveFormState(this.productForm.value);

        this.scrapingService.scrapingData.productPostDTO = {
            name_Local: this.productForm.value.name_Local,
            name_Global: this.productForm.value.name_Global,
            description_Local: this.productForm.value.description_Local,
            description_Global: this.productForm.value.description_Global,
            subCategoryId: this.productForm.value.SubCategory?.id,
            brandId: this.productForm.value.Brand?.id,
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
                    // if data contain null objects
                    // show a dialog to confirm the data
                    if (data.some((x) => x === null)) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No data found for Some/Any of the given URLs',
                        });
                        // Make All Urls that are not found in the data as dirty
                        const urls = (this.scrapingService.urls = data.map(
                            (x) => x?.productlink1
                        ));
                        const failed = this.productForm.value.urls.filter(
                            (urlGroup) => !urls.includes(urlGroup.url)
                        );
                        this.failed = failed.map((x) => x.url);
                    } else {
                        this.scrapingService.scrapingData.productDetailDTO =
                            data;
                        this.scrapingService.urls = data.map(
                            (x) => x?.productlink1
                        );
                        console.log(
                            this.scrapingService.scrapingData.productDetailDTO
                        );
                        console.log(this.scrapingService.urls);
                        this.router.navigate([
                            '/admin/products/add-product/review',
                        ]);
                    }
                    // else {
                    //     console.error('No data found for the given URLs');
                    // }
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
