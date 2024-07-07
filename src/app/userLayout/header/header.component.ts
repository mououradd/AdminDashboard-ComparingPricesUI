import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'app-header',
    standalone: true,

    imports: [CommonModule, IconFieldModule, InputIconModule, InputTextModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    isAuthenticated: boolean = false;
    private sharedSearchService: SearchService
    constructor(private router: Router,private search:SearchService) {
    }


    navigateToSearch(query: string) {
        if (query !== '') {
            this.search.updateSearchQuery(query);
            this.router.navigate(['/search-details'], {
                queryParams: { q: query,page:1 },
            });
        }
    }
}
