import { Component, OnInit } from '@angular/core';
import { Post } from '../classes/post';
import { CommentService } from '../Services/comment.service';
import { PostService } from '../Services/post.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name: string = sessionStorage.getItem('user')!;
  postContent: string = '';
  posts: any;
  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getPostForUser();
  }
  setUser() {
    sessionStorage.setItem('user', this.name);
  }
  PostContent() {
    this.userService
      .postContent(this.postContent)
      .subscribe((result) => console.log(result));
    this.postContent = '';
  }
  getPostForUser() {
    this.postService.getPostForUser().subscribe((result) => {
      console.log(result);
      this.posts = result;
    });
  }
}
