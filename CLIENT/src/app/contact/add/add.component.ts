import { Component, OnInit } from '@angular/core';
import { Contact} from 'src/app/contact';
import { ContactsService } from 'src/app/contacts.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public contact = new Contact('','','','','');
  public message!:string;
  public isError:boolean = false;
  public isSuccess:boolean = false;
  public isHide:boolean=true;

  public cname!:string;
  public cemail!:string;
  public cphone!:string;
  public ctype!:string;
  public uid= localStorage.getItem('userId');

  constructor(private _cs:ContactsService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    const contactInfo={
      cname:this.cname,
      cemail:this.cemail,
      cphone:this.cphone,
      ctype:this.ctype,
      uid:this.uid
  
    }
  
    this._cs.addContact(contactInfo).subscribe(response=>{
      this.message=response.message;
      this.isSuccess=true;
      this.isError=false;
    },(err:any)=>{
      this.message=err.error.message;
      this.isSuccess=false;
      this.isError=true;
    })
  }

}
