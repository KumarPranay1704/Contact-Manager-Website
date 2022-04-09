import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new User('','','');
  public message!:string;
  public isError:boolean = false;
  public isSuccess:boolean = false;
  public isHide:boolean=true;
  public cpass!:string
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmitForm(){
    this._userService.registerUser(this.user).subscribe(response=>{
      this.message=response.message;
      this.isSuccess=true;
      this.isError=false;
    },
    (err:any)=>{
      this.message=err.error.message;
      this.isSuccess=false;
      this.isError=true;
    })
    
  }
  onInput(evt:any){
    this.cpass=evt.target.value;
    if(this.user.password == evt.target.value){
      this.isHide=true;
    }else{
      this.isHide=false;
    }
  }
  onInput1(evt:any){
    if(this.cpass == evt.target.value){
      this.isHide=true;
    }else{
      this.isHide=false;
    }
  }

}
