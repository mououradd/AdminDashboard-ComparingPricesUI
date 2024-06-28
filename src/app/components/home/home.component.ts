import { Component } from '@angular/core';
import { FeaturedProductComponent } from "../../userLayout/components/featured-product/featured-product.component";
import { MostPopularComponent } from 'src/app/userLayout/components/most-popular/most-popular.component';
import { HomeProductComponent } from 'src/app/userLayout/components/home-product/home-product.component';



@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FeaturedProductComponent, MostPopularComponent, HomeProductComponent]
})
export class HomeComponent {

}
