import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../userLayout/layout/layout.component';

const routes: Routes = [
  {
    path: '',component: LayoutComponent,
    children:[
        { path: 'home', loadChildren: () => import('../../components/home/home-routing.module').then(m => m.HomeRoutingModule) },
        { path: 'profile', loadChildren: () => import('../../components/user/profile/Profile-routing.module').then(m => m.UserRoutingModule) },
        { path: 'profile/edit', loadChildren: () => import('../../components/user/edit-profile/Profile-routing.module').then(m => m.EditProfileRoutingModule) },
        { path: 'favorites', loadChildren: () => import('../../components/user/favorites/Favourite-routing.module').then(m => m.FavRoutingModule) },
        { path: 'history', loadChildren: () => import('../..//components/user/history/History-routing.module').then(m => m.HisRoutingModule) },
        { path: 'alerts', loadChildren: () => import('../../components/user/alerts/Alert-routing.module').then(m => m.AlertRoutingModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
