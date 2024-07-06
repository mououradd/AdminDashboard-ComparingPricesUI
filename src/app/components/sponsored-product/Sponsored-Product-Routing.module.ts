import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SponsoredProductComponent } from './sponsored-product.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SponsoredProductComponent }
  ])],
  exports: [RouterModule]
})
export class SponsoredProductRoutingModule { }
