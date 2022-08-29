import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../classes/post';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  userSignIn(user: User): Observable<string> {
    return this.http.post('http://localhost:8081/register', user, {
      responseType: 'text',
    });
  }
  userLogIn(user: User): Observable<string> {
    return this.http.post('http://localhost:8081/authenticate', {
      "username":user.email,
      "password":user.password
    }, {
      responseType: 'text',
    });
  }
  refreshToken() {
    return this.http.get('http://localhost:8081/refreshtoken');
  }
  sendOtp(username: string): Observable<string> {
    return this.http.post(
      'http://localhost:8081/sendMail',
      { username },
      { responseType: 'text' }
    );
  }
  checkOtp(username: string, otp: string): Observable<string> {
    return this.http.post(
      'http://localhost:8081/api/user/checkOtp',
      { username: username, otp: otp },
      { responseType: 'text' }
    );
  }
  postContent(postContent:string):Observable<string>{
    return this.http.post("http://localhost:8081/api/user/post",{"email":sessionStorage.getItem("auth-user"),"postContent":postContent},{responseType:"text"})
  }
  userLikes():Observable<any>{
    return this.http.post("http://localhost:8081/api/user/getUserLikes",{"email":sessionStorage.getItem("auth-user")});
  }
  loadUser():Observable<any>{
    return this.http.post("http://localhost:8081/api/user/getUser",{"email": sessionStorage.getItem("auth-user")})
  }
  userComments():Observable<any>{
    return this.http.post("http://localhost:8081/api/user/getUserComments",{"email":sessionStorage.getItem("auth-user")})
  }
  getUsersLikeOnPosts():Observable<any>{
    return this.http.post("http://localhost:8081/api/user/getUsersLikeOnPosts",{"email":sessionStorage.getItem("auth-user")})
  }
}
