import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CatagoryComponent } from './components/catagory/catagory.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    // { path: '', loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    //{ path: '', loadChildren: () => import('../app/components/dashboard/dashboard-routing.module').then(m => m.DashboardsRoutingModule) },
                    { path: 'dashboard', loadChildren: () => import('../app/components/dashboard/dashboard-routing.module').then(m => m.DashboardsRoutingModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'products', loadChildren: () => import('../app/components/products/products-routing.module').then(m => m.ProductsRoutingModule) },
                    { path: 'category',loadChildren: () => import('../app/components/catagory/category-routing.module').then(m => m.CategoryRoutingModule)},
                    { path: 'brands',loadChildren: () => import('../app/components/brands/category-routing.module').then(m => m.BrandsRoutingModule)},
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'home', component: HomeComponent },
            { path: 'register',component:RegisterComponent},
            { path: 'login',component:LoginComponent},
            // { path: 'products',component:ProductsComponent},
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
