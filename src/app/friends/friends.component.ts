import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { FriendsService } from '../Services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  suggestedFriends:User[]=[];
  friendRequests:User[]=[];
  friends:User[]=[];
  totalRequest!: number;

  constructor(private friendService:FriendsService) { }

  ngOnInit(): void {
    this.getSuggestedFriends();
    this.getPendingFriendRequest();
    this.getFriends();
  }
  getSuggestedFriends(){
    this.friendService.getSuggestedFriends().subscribe(result=>this.suggestedFriends=result);
  }
  sendFriendRequest(id:number){
    console.log(this);
    
    this.friendService.sendFriendRequest(id).subscribe(result=>console.log(result)
    )
  }
  getPendingFriendRequest(){
    this.friendService.getPendingFriendRequest().subscribe(result=>{
      this.friendRequests=result;
      this.totalRequest=this.friendRequests.length;
    }
    )
  }
  getFriends(){
    this.friendService.getFriends().subscribe(result=>this.friends=result
    )
  }
  acceptRequest(id:number){
    this.friendService.acceptRequest(id).subscribe(result=>console.log(result)
    )
  }

}
