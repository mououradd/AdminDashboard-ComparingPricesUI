import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from 'src/app/services/auth.service';
import { FooterComponent } from 'src/app/userLayout/footer/footer.component';
import { HeaderComponent } from 'src/app/userLayout/header/header.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [

    PanelMenuModule,HeaderComponent,FooterComponent

  ],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  items: any[];
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.items = [
      {
        label: ' Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: ['profile']
      },
      {
        label: ' Favorites',
        icon: 'pi pi-fw pi-heart',
        routerLink: ['favorites']
      },
      {
        label: ' History',
        icon: 'pi pi-fw pi-history',
        routerLink: ['history']
      },
      {
        label: ' Alerts',
        icon: 'pi pi-fw pi-bell',
        routerLink: ['alerts']
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout() {
    this.authService.logout();
  }
}
