import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { HistoryProduct } from 'src/app/models/HistoryProd';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, CardModule, ToolbarModule, NgFor, PaginatorModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'] // Corrected styleUrls
})
export class HistoryComponent implements OnInit {
  HistProd: HistoryProduct[] = [];
  paginatedFavProd: HistoryProduct[] = [];
  id: string;
  first = 0;
  rows = 10;
  totalRecords: number;

  constructor(private userServ: UsersService, private authServ: AuthService,private _router: Router) {}

  ngOnInit(): void {
    this.id = this.authServ.GetUserData().uid;

    this.userServ.GetHistoryroduct(this.id).subscribe({
      next: (res: HistoryProduct[]) => {
        this.HistProd = res;
        console.log(this.HistProd);
        this.totalRecords = res.length;
        this.updatePaginatedProducts();
      }
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedFavProd = this.HistProd.slice(start, end);
  }

  RemoveItem(Prodid: number) {
    this.userServ.RemoveHistProduct(this.id,Prodid).subscribe({
        next : res=>{
            console.log(Prodid+'      '+this.id )
            console.log(res)
            this.userServ.GetHistoryroduct(this.id).subscribe({
                next: (res: HistoryProduct[]) => {
                    this.HistProd = res;
                    console.log(this.HistProd)
                    this.totalRecords = res.length;
                    this.updatePaginatedProducts();
                }
                });
        },
        error :err=>console.log(err)
    })
}
getDetails(productId: number) {
    this._router.navigate([`productDetails/${productId}`]);
}


}
