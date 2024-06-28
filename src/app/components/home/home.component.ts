import { Component } from '@angular/core';
import { FeaturedProductComponent } from "../../userLayout/components/featured-product/featured-product.component";
import { MostPopularComponent } from 'src/app/userLayout/components/most-popular/most-popular.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FeaturedProductComponent, MostPopularComponent]
})
export class HomeComponent {

}
