import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'user-layout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
  templateUrl: './user.layout.component.html',
  styleUrl: './user.layout.component.html'
})
export class userLayoutComponent {

}
