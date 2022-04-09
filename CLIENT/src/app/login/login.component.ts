import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public message!:string;
  public isError:boolean = false;
  public isSuccess:boolean = false;

  public password!:string;
  public email!:string;

  constructor(private _userService:UserService,private _router:Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    const loginInfo={
      email:this.email,
      password:this.password
    }
    this._userService.loginUser(loginInfo).subscribe(response=>{
      this.message=response.message;
      this.isSuccess=true;
      this.isError=false;
      localStorage.setItem('token',response.token);
      localStorage.setItem('userId',response.user.id);
      localStorage.setItem('userName',response.user.name);
      this._router.navigate(['/contact/list']);
    },(err:any)=>{
      this.message=err.error.message;
      this.isSuccess=false;
      this.isError=true;
    })
  }
}
