import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notfoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PrivacyPolicyComponent } from './userLayout/components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './userLayout/components/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './userLayout/components/about-us/about-us.component';

const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'privacy-policy', component : PrivacyPolicyComponent , pathMatch: 'full'},
    {path : 'terms-and-conditions', component : TermsAndConditionsComponent, pathMatch: 'full'},
    {path: 'about-us', component : AboutUsComponent, pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule)
    },
    {
        path: '',
        loadChildren: () => import('./modules/user/user-routing.module').then(m => m.UserRoutingModule)
    },
    { path: 'notfound', component: notfoundComponent },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
