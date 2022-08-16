import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:string=sessionStorage.getItem("user")!;
  constructor() { }

  ngOnInit(): void {
  }
  setUser(){
    sessionStorage.setItem("user",this.name);
  }

}
