import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './not-found.component.html',
    styles:['@import "../../../../node_modules/primeflex/primeflex.scss";']
})
export class notfoundComponent { }