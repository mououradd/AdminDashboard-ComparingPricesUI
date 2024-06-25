import { Component } from '@angular/core';
import { FeaturedProductComponent } from "../../userLayout/components/featured-product/featured-product.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FeaturedProductComponent]
})
export class HomeComponent {

}
