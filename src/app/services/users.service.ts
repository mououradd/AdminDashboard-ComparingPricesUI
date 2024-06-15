    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { Injectable } from '@angular/core';

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

    getAllUser(){
        return this.httpclient.get(this.BaseUrlUser)
    }

    getAllAdmin(){
        return this.httpclient.get(this.BaseUrlAdmin)
    }

    AssignAdmin(id: string) {
        return this.httpclient.post(`${this.AssignUrl+'AssignAdmin?ID='}${id}`, {}, { responseType: 'text' });
    }

    RemoveAdmin(id: string){
        return this.httpclient.post(`${this.AssignUrl+'RemoveAdmin?ID='}${id}`, {}, { responseType: 'text' });
    }



    }
