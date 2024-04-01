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

  userSignup(user:{email: string;password: string;userName: string;}): Observable<{token:string;success:boolean;refreshToken:string;}> {
    return this.http.post<{token:string;success:boolean;refreshToken:string;}>(baseUrl+'signup/',user); 
  }
  
  userLogin(user:{email: string;password: string;}): Observable<{token:string;success:boolean;refreshToken:string;}> {
    return this.http.post<{token:string;success:boolean;refreshToken:string;}>(baseUrl+'login/',user); 
  }
  
  refreshToken(refreshToken:string) : Observable<{refreshToken:string;accessToken:string;success:boolean}> {
    return this.http.post<{refreshToken:string;accessToken:string;success:boolean}>(baseUrl + 'refresh-token', { refreshToken});
  }

}
