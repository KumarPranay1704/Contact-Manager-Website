import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private _cs:ContactsService) { }

  ngOnInit(): void {

  }
  onClick(event:any,id:any){
    if(event){

    }
  }

}
