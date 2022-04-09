import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  // private _url = "http://localhost:3000/api/contact";
  constructor(private _http: HttpClient) { }

  listAllContacts(){
    return this._http.get<{message:string,ContactData:any}>(environment.baseUrlContact);
  }
  listAllContactsByUser(){
    return this._http.get<{message:string,ContactData:any}>(environment.baseUrlContact+"/"+localStorage.getItem('userId'),{
      headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
    });
  }
  listoneContactsByUser(event:any){
    return this._http.get<{message:string,ContactData:any}>(environment.baseUrlContact+'/getbyId/'+event)
  }
  showContact(){
    return this._http.get<{message:string,ContactData:any}>(environment.baseUrlContact+"/getbyId/"+localStorage.getItem('cId'));
  }

  getContactById(id:string){
    return this._http.get<{message:string,ContactData:any}>(environment.baseUrlContact+"/getbyId/"+id,{
      headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
    });
  }

  updateContact(id:string,contact:any){
    return this._http.put<{message:string}>(environment.baseUrlContact+'/updatebyid/'+id,contact,{
      headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
    });
  }
  deleteContactById(id:string){
    return this._http.delete<{message:string,ContactData:any}>(environment.baseUrlContact+"/deletebyid/"+id,{
      headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
    });
  }
  addContact(contactInfo:any){
    return this._http.post<{message:string,contact:any}>(environment.baseUrlContact+'/save',contactInfo);
  }

}
