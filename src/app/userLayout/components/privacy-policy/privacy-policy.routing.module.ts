import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PrivacyPolicyComponent }
	])],
	exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }