import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private chatService:ChatServiceService) { }
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
