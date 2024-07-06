import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSummary } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiUrl: string = environment.api + '/User';



    constructor(private httpclient: HttpClient) { }
    ngOnInit(): void {

    }

    getAllUser() {
        return this.httpclient.get(this.apiUrl + '/user')
    }

    getAllAdmin() {
        return this.httpclient.get(this.apiUrl + '/admin')
    }

    AssignAdmin(id: string) {
        return this.httpclient.post(`${this.apiUrl + 'AssignAdmin?ID='}${id}`, {}, { responseType: 'text' });
    }

    RemoveAdmin(id: string) {
        return this.httpclient.post(`${this.apiUrl + 'RemoveAdmin?ID='}${id}`, {}, { responseType: 'text' });
    }

    getUserById(id: string) {
        return this.httpclient.get(this.apiUrl + `${id}`)
    }

    UpdateUserData(User: object, id: string) {
        return this.httpclient.put(this.apiUrl + `${id}`, User, { responseType: 'text' })
    }

    GetFavouriteroduct(id: string) {
        return this.httpclient.get(`${this.apiUrl + 'FavProduct?id='}${id}`)
    }

    AddFavouriteProduct(id: number) {
        return this.httpclient.post(`${this.apiUrl + 'FavProduct?id='}${id}`, id)
    }

    GetHistoryroduct(id: string) {
        return this.httpclient.get(`${this.apiUrl + 'HistoryProduct?id='}${id}`)
    }

    GetAlertroduct(id: string) {
        return this.httpclient.get(`${this.apiUrl + 'AlertProduct?id='}${id}`)
    }

    RemoveAlertProduct(UserId: string, ProductID: number): Observable<any> {
        const url = `${this.apiUrl}RemoveAlertProduct?id=${ProductID}&Userid=${UserId}`;
        return this.httpclient.delete(url, { responseType: 'text' });
    }

    RemoveFavProduct(UserId: string, ProductID: number): Observable<any> {
        const url = `${this.apiUrl}RemoveFavProduct?id=${ProductID}&Userid=${UserId}`;
        return this.httpclient.delete(url, { responseType: 'text' });
    }

    RemoveHistProduct(UserId: string, ProductID: number): Observable<any> {
        const url = `${this.apiUrl}RemoveHistoryProduct?id=${ProductID}&Userid=${UserId}`;
        return this.httpclient.delete(url, { responseType: 'text' });
    }


    getUserCount(): Promise<number> {
        return this.httpclient.get<number>(`${this.apiUrl}/Count`)
            .toPromise()
            .then(data => data as number);
    }

    getUserCountByTIme(): Promise<DataSummary[]> {
        return this.httpclient.get<DataSummary[]>(`${this.apiUrl}/countByJoinDate`)
            .toPromise()
            .then(data => data as DataSummary[]);
    }
}
