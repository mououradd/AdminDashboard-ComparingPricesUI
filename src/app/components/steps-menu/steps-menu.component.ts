import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-steps-menu',
  standalone: true,
  imports: [StepsModule, TabMenuModule, RouterModule],
  templateUrl: './steps-menu.component.html',
  styles: [
    `
      :host ::ng-deep .p-menubar-root-list {
        flex-wrap: wrap;
      }
    `,
  ],
})
export class StepsMenuComponent implements OnInit {
  routeItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.routeItems = [
      { label: 'Add', routerLink: 'add' },
      { label: 'Review', routerLink: 'review' },
      { label: 'Images', routerLink: 'images' },
      { label: 'Confirmation', routerLink: 'confirm' },
    ];
  }

  navigateTo(step: string) {
    this.router.navigate([`/admin/products/add-product/${step}`]);
  }
}
