import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [DialogModule, ButtonModule],
    templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
    // Constructor
    constructor(private router: Router) {}
    @Input() display: boolean = true;
    @Input() header: string = 'Error, Not All Links Retrieved';
    @Input() NavigateUrl: string = '';

    // Function to Confirm
    confirm() {
        this.router.navigate([this.NavigateUrl]);
    }
    // Function to Cancel
    cancel() {
        this.display = false;
    }
   
}
