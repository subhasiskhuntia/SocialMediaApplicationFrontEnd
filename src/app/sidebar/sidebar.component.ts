import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  receiver:string="";
  constructor(private chatService:ChatServiceService,private activeRoute:ActivatedRoute) {
    activeRoute.params.subscribe(a=>
      this.receiver=a["name"]
    )
    
   }
  contactedPerson:any=[];
  sender:string=sessionStorage.getItem("user")!;
  ngOnInit(): void {
    this.getPreviouslyContactedPerson();
  }
  getPreviouslyContactedPerson(){
    this.chatService.getContactedPerson(this.sender).subscribe(result=>this.contactedPerson=result
    )
  }

}
