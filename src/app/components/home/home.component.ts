import { Component } from '@angular/core';
import { FeaturedProductComponent } from "../../userLayout/components/featured-product/featured-product.component";
import { MostPopularComponent } from 'src/app/userLayout/components/most-popular/most-popular.component';
import { HomeProductComponent } from 'src/app/userLayout/components/home-product/home-product.component';
import { DomainComponent } from 'src/app/userLayout/components/domain/domain.component';
import { GalleriaModule } from 'primeng/galleria';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FeaturedProductComponent, MostPopularComponent, HomeProductComponent,DomainComponent,GalleriaModule]
})
export class HomeComponent {

        constructor() { }

        images: any[];

        ngOnInit() {
            this.images = [];
            this.images.push('https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg');
            this.images.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC5EF7dP_bqzXD--ZP8PczI1I__9-TJVlCKDjtrCT3EMR7YpR-HJfXpZSYgLt4ra8dNIU&usqp=CAU');
        }

}
