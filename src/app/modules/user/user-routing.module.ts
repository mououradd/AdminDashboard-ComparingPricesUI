import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userLayoutComponent } from '../../userLayout/user.layout.component';
import { UserLayoutComponent } from 'src/app/components/user/user-layout/user-layout.component';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { SearchDetailsComponent } from 'src/app/userLayout/components/search-details/search-details.component';

const routes: Routes = [
    {
    path: '',component: userLayoutComponent,
    children:[
        { path: 'home', loadChildren: () => import('../../components/home/home-routing.module').then(m => m.HomeRoutingModule) },
        { path: 'productDetails/:id',component:ProductDetailsComponent},
        {path:'user',component:UserLayoutComponent,children:[
            { path: 'profile', loadChildren: () => import('../../components/user/profile/Profile-routing.module').then(m => m.UserRoutingModule) },
            { path: 'profile/edit', loadChildren: () => import('../../components/user/edit-profile/Profile-routing.module').then(m => m.EditProfileRoutingModule) },
            { path: 'favorites', loadChildren: () => import('../../components/user/favorites/Favourite-routing.module').then(m => m.FavRoutingModule) },
            { path: 'history', loadChildren: () => import('../..//components/user/history/History-routing.module').then(m => m.HisRoutingModule) },
            { path: 'alerts', loadChildren: () => import('../../components/user/alerts/Alert-routing.module').then(m => m.AlertRoutingModule) },
        ]},
        {path:'search-details',component:SearchDetailsComponent}


    ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
