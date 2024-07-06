    import { CommonModule } from '@angular/common';
    import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

    @Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule,RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
    })
    export class HeaderComponent implements OnInit {
        /**
         *
         */
        constructor(private authService: AuthService) {
        }
    isAuthenticated: boolean = false;
    ngOnInit(): void {
        if(localStorage.getItem('UserToken')!=null){
            this.isAuthenticated=true
        }
    }
    logout(event:Event) {
        this.authService.logout();
        event.stopPropagation()
    }

}
