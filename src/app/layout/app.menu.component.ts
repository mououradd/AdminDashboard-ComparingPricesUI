import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

        ngOnInit() {
            this.model = [
            {
                label: 'Home',
                items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                { label: 'Products', icon: 'pi pi-fw pi-box', routerLink: ['/products'] },
                { label: 'Categories', icon: 'pi pi-fw pi-sitemap', routerLink: ['/category'] },
                { label: 'Brands', icon: 'pi pi-fw pi-at', routerLink: ['/admin/brands'] },
                { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/admin/users'] },
                { label: 'Admins', icon: 'pi pi-fw pi-check-circle', routerLink: ['/admin/admins'] },
                { label: 'Paid Ads', icon: 'pi pi-fw pi-dollar', routerLink: ['/admin/paid-ads'] },
                { label: 'Log Out', icon: 'pi pi-fw pi-power-off', routerLink: ['/admin/logout'] }
                ]
            },
            ];
        }
}
