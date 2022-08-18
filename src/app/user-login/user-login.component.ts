import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../classes/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  checkUser(loginRef: NgForm) {
    let loginValue = loginRef.value;
    let username = loginValue.username;
    let password = loginValue.password;
    console.log(username, password);
    let login = new User(0,"","","",password,username,"","");
    this.userService.userLogIn(login).subscribe(
      (data) => {
        console.log(JSON.parse(data));
        let userName=JSON.parse(data).userName;
        let token=JSON.parse(data).token
        let firstName=JSON.parse(data).firstName
        let role=JSON.parse(data).role;
        sessionStorage.setItem("userName",userName)
        sessionStorage.setItem("token","Bearer "+token)
        sessionStorage.setItem("firstName",firstName);
        sessionStorage.setItem("role",role);
        if(firstName!=null){
          history.back();
        }
      },
      (error) => console.log(error),
      () => console.log('process completed')
    );
  }

}
