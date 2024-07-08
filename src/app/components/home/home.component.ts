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
            this.images.push('https://robcubbon.com/wp-content/uploads/2016/01/Why-Product-Comparison-Blog-Posts-Are-Massive-Earners-black-board-comparing-two-products.jpg');
            this.images.push('https://static.digit.in/default/14649samsungs23-ultra1-2-20231280x720-7e165d4c68.jpeg');
            this.images.push('https://media.licdn.com/dms/image/C4E12AQGLInZwLBXTLw/article-cover_image-shrink_720_1280/0/1602734977905?e=2147483647&v=beta&t=O0uxWk1mCQBKhT4kTGH5R4AKgDl1HFwf4xJSQoV0u9M');
        }

}
