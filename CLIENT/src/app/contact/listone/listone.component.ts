import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/contacts.service';

@Component({
  selector: 'app-listone',
  templateUrl: './listone.component.html',
  styleUrls: ['./listone.component.css']
})
export class ListoneComponent implements OnInit {
  public cData:any;
  public message!:string;
  public isError:boolean = false;
  public isSuccess:boolean = false;
  constructor(private _cs:ContactsService,private _router:Router) { }

  ngOnInit(): void {
    this._cs.showContact().subscribe(response=>{
      console.log(response.ContactData);
      this.cData=response.ContactData;
    },(err:any)=>{
      console.log(err);
    })
  }

  onClick(event:any,id:any){
    if(event){
      this._cs.deleteContactById(id).subscribe(response=>{
        this.message = response.message;
        this.isError=false;
        this.isSuccess=true;
        this._router.navigate(['/contact/list']);
      },err=>{
        this.message=err.error.message;
        this.isError=true;
        this.isSuccess=false;
      })
    }
  }
}
