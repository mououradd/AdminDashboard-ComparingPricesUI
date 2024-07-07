import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TermsAndConditionsComponent }
	])],
	exports: [RouterModule]
})
export class TermsAndConditionsRoutingModule { }