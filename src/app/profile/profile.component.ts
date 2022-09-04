import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../classes/post';
import { CommentService } from '../Services/comment.service';
import { PostService } from '../Services/post.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  showComments: boolean = false;
  comments: any;
  showLikes: boolean = false;
  usersLikeOnPosts: any;
  urlId!: number;
  authUser:string=sessionStorage.getItem("auth-user")!;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private routes: ActivatedRoute
  ) {
    routes.params.subscribe((result) => this.urlId=result["id"]);
  }
  ngOnInit(): void {
    if(this.authUser!=null && this.urlId==null ){
      this.loadUser();
      this.loadUserComments();
      this.getUsersLikeOnPost();
    }
    else if(this.urlId!=null){
      this.loadFriends();
    }

  }
  loadUser() {
    this.userService.loadUser().subscribe((result) => {
      this.user = result;
      console.log(result);
    });
  }
  loadUserComments() {
    this.userService.userComments().subscribe((result) => {
      this.comments = result;
      console.log(result);
    });
  }
  toggleShowUserComments() {
    this.showComments = !this.showComments;
  }
  toggleShowUserLikes() {
    this.showLikes = !this.showLikes;
  }
  getUsersLikeOnPost() {
    this.userService
      .getUsersLikeOnPosts()
      .subscribe((result) =>{
        (this.usersLikeOnPosts = result);
        console.log(result);
        
      } 
      );
  }
  loadFriends(){
    this.userService.loadDifferentUserById(this.urlId).subscribe(result=>
      {
        console.log(result);
        this.user=result;
      }
    )
  }
}
