import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../classes/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  otp:string="";
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {}

  formSignIn = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.{5,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$'),
    ]),
    phone: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
  });

  submitAdmin() {
    console.log(this.formSignIn);
    console.log(this.formSignIn.value);
    let data = this.formSignIn.value;
    let user = new User(0,data.firstName,data.lastName,data.dob,data.password,data.email,data.phone,data.about);
    console.log(user + 'user');
    console.log(JSON.stringify(user));

    this.userService.userSignIn(user).subscribe(
      (data) => alert(data),
      (error) => console.log(error),
      () => console.log('process completed')
    );
  }
  timeLeft:number=300;
  interval:any;
  sendOtp(){
    this.timeLeft=300;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.timeLeft=300;
        document.getElementById("closeOtpSender")?.click();

      }
    },1000)
    this.userService.sendOtp(this.formSignIn.value.email).subscribe(result=>console.log(result)
    );
  }
  checkOtp(){
    console.log(this.otp);
    this.userService.checkOtp(this.formSignIn.value.email,this.otp).subscribe(result=>{
      console.log(result);
      
      if(result=="OTP matched"){
        this.submitAdmin();
        this.timeLeft=300;
        document.getElementById("closeOtpSender")?.click();
      }
      else{
        alert(result);
      }
    }
    )
  }  

}
