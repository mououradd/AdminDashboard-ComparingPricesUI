    import { CommonModule } from '@angular/common';
    import { HttpClient } from '@angular/common/http';
    import { Component, OnInit } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
    import { ActivatedRoute, Router } from '@angular/router';
    import { RatingModule } from 'primeng/rating';
    import { Product, ProductDetails } from 'src/app/models/product';
    import { ToastModule } from 'primeng/toast';
    import { AuthService } from 'src/app/services/auth.service';
    import { ProductService } from 'src/app/services/product.service';
    import { UsersService } from 'src/app/services/users.service';
    import { MessageService } from 'primeng/api';

    @Component({
    selector: 'app-product-details',
    standalone: true,
    providers: [MessageService],
    imports: [CommonModule,FormsModule,RatingModule,ToastModule],
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'] // Corrected from styleUrl to styleUrls
    })
    export class ProductDetailsComponent implements OnInit {



    images: { thumb: SafeUrl, full: SafeUrl }[] = [];
    product:ProductDetails = {} as ProductDetails;
    count:number=0;
    Userid:string=''
    isAuthanciated: boolean=false
    mainImage: SafeUrl;



    constructor(private sanitizer: DomSanitizer, private productService: ProductService, private activeRouter: ActivatedRoute
        ,private authServ:AuthService,private usersService:UsersService,
        private messageService: MessageService, private _router: Router) {

    }

    updateMainImage(image: SafeUrl) {
        this.mainImage = image;
    }

    ngOnInit(): void {
        this.getproductDetails();
        this.isAuthanciated=localStorage.getItem('UserToken')!=null?true:false
        //this.Userid = this.authServ.GetUserData().uid;
    }



    getproductDetails() {
        this.activeRouter.params.subscribe((params) => {
        console.log(params['id']);
        this.productService.getPproductDetails(params['id']).subscribe((data:ProductDetails) => {
            this.product=data
            this.mainImage =this.product.images[0]
            this.product.links.forEach(link =>  {
                link.domainLogo = this.getWebsiteLogo(link.productLink)
                //console.log(link.domainLogo)
            }
            )
            this.count=this.product.links.length
            //console.log(this.product);
        });
        });
    }

    addToFav(Prodid: number) {
        //console.log(Prodid);
        if (this.isAuthanciated) {
            this.Userid = this.authServ.GetUserData().uid;
            this.usersService.AddFavouriteProduct(this.Userid,Prodid).subscribe({
        next: (data) => {
            if(data=="Already Exists") {
            this.messageService.add({ severity: 'error', summary: '', detail: `${data}`, life: 3000 });
            }
            else{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${data}`, life: 3000 });
            }
        },
        error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'error', detail: `${err.message}`, life: 3000 });
           // console.log(err);
        },
            })
                }
                else{
                    this._router.navigate([`login`]);
                }
            }
        getWebsiteLogo(url: string)   {
            if(url.includes('www.amazon')) {
            return '../../../assets/layout/images/amazonLogo.png'
        }
        else if(url.includes('www.noon')) {
            return '../../../assets/layout/images/noon.jpg'
        }

        else if(url.includes('www.jarir')) {
            return '../../../assets/layout/images/Garier.png'
        }
        else  {
            return '../../../assets/layout/images/blank.jpg'
        }
    }

    addAlert(Prodid: number){
        if (this.isAuthanciated) {
            this.Userid = this.authServ.GetUserData().uid;
        this.usersService.AddAlertProduct(this.Userid,Prodid).subscribe({
            next: (data) => {
                if(data=="Already Exists") {
                this.messageService.add({ severity: 'error', summary: '', detail: `${data}`, life: 3000 });
                }
                else{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${data}`, life: 3000 });
                }
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'error', detail: `${err.message}`, life: 3000 });
               // console.log(err);
            },
                })
    }
                else{
                    this._router.navigate([`login`]);
                }

    }
}
