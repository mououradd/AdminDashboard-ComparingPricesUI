import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatagoryComponent } from './catagory.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CatagoryComponent }
	])],
	exports: [RouterModule]
})
export class CategoryRoutingModule { }
