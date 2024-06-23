import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
@Component({
    selector: 'app-loading-dialog',
    standalone: true,
    imports: [ProgressSpinnerModule, DialogModule],
    templateUrl: './loading-dialog.component.html',
    styleUrl: './loading-dialog.component.scss',
})
export class LoadingDialogComponent {
    display: boolean = true;
}
