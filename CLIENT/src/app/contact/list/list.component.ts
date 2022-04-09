import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  

  public ContactData:any[]=[];

  constructor(private _cs:ContactsService,private _router:Router) { }

  ngOnInit(): void {
    this._cs.listAllContactsByUser().subscribe(response=>{
      this.ContactData=response.ContactData;
    },(err:any)=>{
      console.log(err);
    })
  }

  onClick(id:any){
    this._cs.listoneContactsByUser(id).subscribe(response=>{
      localStorage.setItem('cId',response.ContactData._id);
      this._router.navigate(['/contact/listone']);
  });

  
}
}
