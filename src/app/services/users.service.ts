    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSummary } from '../models/User';

    @Injectable({
    providedIn: 'root'
    })
    export class UsersService {



    BaseUrlAdmin:string ='http://localhost:5066/api/User/admin'

    BaseUrlUser:string ='http://localhost:5066/api/User/user'

    AssignUrl:string ='http://localhost:5066/api/User/'

    constructor(private httpclient:HttpClient) { }
    ngOnInit(): void {

    }

        getAllUser() {
            const token = localStorage.getItem('UserToken');
            const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
            });

            return this.httpclient.get(this.BaseUrlUser, { headers });
        }


    getAllAdmin(){
        return this.httpclient.get(this.BaseUrlAdmin)
    }

    AssignAdmin(id: string) {
        return this.httpclient.get(`${this.AssignUrl+'AssignAdmin?ID='}${id}`,  { responseType: 'text' });
    }

    RemoveAdmin(id: string){
        return this.httpclient.post(`${this.AssignUrl+'RemoveAdmin?ID='}${id}`, {}, { responseType: 'text' });
    }

    getUserById(id:string){
        return this.httpclient.get(this.AssignUrl+`${id}`)
    }

    UpdateUserData(User:object,id:string){
        return this.httpclient.put(this.AssignUrl+`${id}`,User, { responseType: 'text' })
    }

    GetFavouriteroduct(id:string){
        return this.httpclient.get(`${this.AssignUrl+'FavProduct?id='}${id}`)
    }

    AddFavouriteProduct(UserId: string, ProductID: number){
        const url = `${this.AssignUrl}AddFavProduct?id=${ProductID}&Userid=${UserId}`;
        return this.httpclient.post(url, null, { responseType: 'text' });
    }


    AddHistoryProduct(UserId: string, ProductID: number){
        const url = `${this.AssignUrl}AddHistoryProduct?id=${ProductID}&Userid=${UserId}`;
        return this.httpclient.post(url, null, { responseType: 'text' });
    }

    AddAlertProduct(UserId: string, ProductID: number){
        const url = `${this.AssignUrl}AddAlertProduct?id=${ProductID}&Userid=${UserId}`;
        return this.httpclient.post(url, null, { responseType: 'text' });
    }

    GetHistoryroduct(id:string){
        return this.httpclient.get(`${this.AssignUrl+'HistoryProduct?id='}${id}`)
    }

    GetAlertroduct(id:string){
        return this.httpclient.get(`${this.AssignUrl+'AlertProduct?id='}${id}`)
    }

    RemoveAlertProduct(UserId: string, ProductID: number): Observable<any> {
        const url = `${this.AssignUrl}RemoveAlertProduct?id=${ProductID}&Userid=${UserId}`;
        return this.httpclient.delete(url, { responseType: 'text' });
        }

        RemoveFavProduct(UserId: string, ProductID: number): Observable<any> {
            const url = `${this.AssignUrl}RemoveFavProduct?id=${ProductID}&Userid=${UserId}`;
            return this.httpclient.delete(url, { responseType: 'text' });
        }

        RemoveHistProduct(UserId: string, ProductID: number): Observable<any> {
            const url = `${this.AssignUrl}RemoveHistoryProduct?id=${ProductID}&Userid=${UserId}`;
            return this.httpclient.delete(url, { responseType: 'text' });
        }

        getUserCountByTIme(): Promise<DataSummary[]> {
            console.log('user counter')

            return this.httpclient.get<DataSummary[]>('http://localhost:5066/api/User/countByJoinDate')
              .toPromise()
              .then(data => data as DataSummary[]);
        }

        getUserCount(): Promise<number> {
            return this.httpclient.get<number>('http://localhost:5066/api/User/Count')
              .toPromise()
              .then(data => data as number);
        }




    }
