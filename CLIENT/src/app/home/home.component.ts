import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _contactService:ContactsService) { }

  public ContactData:any[]=[];

  ngOnInit(): void {
    this._contactService.listAllContacts().subscribe(response=>{
      this.ContactData=response.ContactData;
    },
    (err:any)=>console.log(err))
  }

}
