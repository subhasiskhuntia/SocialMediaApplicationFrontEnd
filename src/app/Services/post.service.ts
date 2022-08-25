import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../classes/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  public getPostForUser():Observable<any>{
    return this.http.post("http://localhost:8081/api/user/postForUser",{"email":sessionStorage.getItem("auth-user")})
  }
  public likeThisPost(post:Post):Observable<string>{
    return this.http.post("http://localhost:8081/api/user/likePost",{"post":post.id,"email":sessionStorage.getItem("auth-user")},{responseType:"text"})
  }
}
