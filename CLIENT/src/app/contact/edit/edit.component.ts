import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';
import { Contact } from 'src/app/contact';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  public cData:any;
  public contact = new Contact('','','','','');
  public message!:string;
  public isError:boolean = false;
  public isSuccess:boolean = false;
  public isHide:boolean=true;
  public cpass!:string
  public contactId!:string
  constructor(private _cs:ContactsService,private _acroute:ActivatedRoute) { }


  ngOnInit(): void {
    
    // this._cs.showContact().subscribe(response=>{
    //   console.log(response.ContactData);
    //   this.cData=response.ContactData;
    // },(err:any)=>{
    //   console.log(err);
    // })
    this._acroute.params.subscribe(param=>{
      this.contactId=param.id
    })
    this._cs.getContactById(this.contactId).subscribe(response=>{
      this.contactId=response.ContactData._id
    this.contact.cname=response.ContactData.contactName,
    this.contact.cphone=response.ContactData.contactPhone,
    this.contact.cemail=response.ContactData.contactEmail,
    this.contact.ctype=response.ContactData.contactType,
    this.contact.uid=response.ContactData.userid
  },(err:any)=>{
    console.log(err);
  })

}

onSubmit(){
  console.log(this.contact);

  this._cs.updateContact(this.contactId,this.contact).subscribe(rs=>{
    this.message=rs.message;
    this.isError=false;
    this.isSuccess=true;
  },err=>{
    this.message=err.error.message;
    this.isError=true;
    this.isSuccess=false;
  })
}
}
