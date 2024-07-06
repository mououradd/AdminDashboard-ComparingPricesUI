import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notfoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PrivacyPolicyComponent } from './userLayout/components/privacy-policy/privacy-policy.component';
import { AdminGuard } from './guards/admin-guard.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
     //{ path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'privacy-policy', component : PrivacyPolicyComponent , pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule)
      ,canActivate: [AdminGuard]
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
