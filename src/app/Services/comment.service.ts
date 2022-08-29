import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  addComment(comment: string, postId: number): Observable<string> {
    return this.http.post(
      'http://localhost:8081/api/user/addComment',
      {
        email: sessionStorage.getItem('auth-user'),
        postId: postId,
        comment: comment,
      },
      { responseType: 'text' }
    );
  }
  showCommentOnAPost(id:number):Observable<any>{
    return this.http.post("http://localhost:8081/api/user/commentOnAPost",{"postId":id});
  }
}
