// app/components/category/category-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './catagory.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CategoryComponent }
  ])],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
