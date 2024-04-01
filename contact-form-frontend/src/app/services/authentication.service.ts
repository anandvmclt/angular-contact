import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import {  User } from './models'; 
import { Observable } from 'rxjs'; 


const baseUrl = 'http://localhost:4000/api/'; 

@Injectable({
  providedIn: 'root' 
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  userSignup(user:{email: string;password: string;userName: string;}): Observable<{token:string;success:boolean}> {
    return this.http.post<{token:string;success:boolean}>(baseUrl+'signup/',user); 
  }
  
  userLogin(user:{email: string;password: string;}): Observable<{token:string;success:boolean}> {
    return this.http.post<{token:string;success:boolean}>(baseUrl+'login/',user); 
  }
  
}
