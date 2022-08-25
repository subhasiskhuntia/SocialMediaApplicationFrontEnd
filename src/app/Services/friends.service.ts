import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private http:HttpClient) { }


  getFriends() {
    return this.http.post<User[]>("http://localhost:8081/api/user/friends",{"email":sessionStorage.getItem("auth-user")});
  }


  getPendingFriendRequest():Observable<User[]> {
    return this.http.post<User[]>("http://localhost:8081/api/user/pendingFriendRequest",{"email":sessionStorage.getItem("auth-user")});
  }


  public getSuggestedFriends():Observable<User[]>{
    return this.http.post<User[]>("http://localhost:8081/api/user/suggestedFriends",{"email":sessionStorage.getItem("auth-user")+""})
  }
  public sendFriendRequest(id:number):Observable<string>{
    return this.http.post("http://localhost:8081/api/user/sendFriendRequest",{"friendId":id,"email":sessionStorage.getItem("auth-user")},{responseType:"text"})
  }
  public acceptRequest(id:number):Observable<string>{
    return this.http.post("http://localhost:8081/api/user/acceptFriendRequest",{"email":sessionStorage.getItem("auth-user"),"friendId":id},{responseType:"text"});
  }
}
