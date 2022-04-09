import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  registerUser(user:any){
    return this._http.post<{message:string,user:any}>(environment.baseUrlUser+'/register',user);
  }
  loginUser(loginInfo:any){
    return this._http.post<{message:string,user:any,token:string}>(environment.baseUrlUser+'/login',loginInfo);
  }
   
  isLoggedIn(){
    if(localStorage.getItem('token')==null){
      return false;
    }else{
      return !!localStorage.getItem('token')!
    }
  }
}
