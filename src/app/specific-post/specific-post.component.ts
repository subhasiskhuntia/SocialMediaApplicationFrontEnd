import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../Services/post.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-specific-post',
  templateUrl: './specific-post.component.html',
  styleUrls: ['./specific-post.component.css']
})
export class SpecificPostComponent implements OnInit {

  postId!: number;
  likedPosts:any;
  post:any;
  constructor(private postService:PostService,private routes:ActivatedRoute,private userService:UserService) {
    routes.params.subscribe(result=>this.postId=result["id"]);
    console.log(this.postId);
    
   }

  ngOnInit(): void {
    this.getThisPost();
    if(sessionStorage.getItem("auth-user")!=null)
      this.getUserLikes();
  }
  getUserLikes() {
    this.userService.userLikes().subscribe((result) => {
      // console.log(result);
      this.likedPosts = result;
    });
  }

  getThisPost(){
    this.postService.getSpecificPost(this.postId).subscribe(result=>
      {
        this.post=result;
        // this.post["postedBy"]=this.post["postedBy"].filter((item: any)=>item!=null);
        this.post["likes"]=this.post["likes"].filter((item: any)=>item!=null);
        this.post["comment"]=this.post["comment"].filter((item: any)=>item!=null);
        // this.post["post"]=this.post["post"].filter((item: any)=>item!=null);
        console.log(this.post);
      }
      );
  }
  likedOrNot(): boolean {
    for (let i = 0; i < this.likedPosts?.length; i++) {
      if (this.likedPosts[i].likePost.id == this.post?.post?.id) {
        return true;
      }
    }
    return false;
  }
  removeLike() {
    this.postService.removeLikes(this.post.post.id).subscribe(
      (result) => console.log(result),
      (error) => console.log(error),
      () => {
        this.likedPosts = this.likedPosts.filter(
          (a: { likePost: { id: number; totalLikes: number } }) => {
            return a.likePost.id != this.post.post.id;
          }
        );
        if (this.post.post.totalLikes > 0) {
          this.post.post.totalLikes = this.post.post.totalLikes - 1;
        }
      }
    );
  }
  toggleCommentButton() {
    // this.showComments = this.commentId!=id;
    // if (this.showComments == false) {
    //   this.commentId = -1;
    // } else {
    //   this.commentId = id;
    // }

    // this.showCommentsOnAPost(id);
  }
  likeThisPost(){

    this.postService.likeThisPost(this.post.post).subscribe(
      (result) => console.log(result),
      (error) => console.log(error),
      () => {
        this.likedPosts.push({
          id: this.likedPosts?.[this.likedPosts.length - 1]?.id + 1,
          likeBy: null,
          likePost: this.post.post,
          createdAt: new Date(),
        });
        this.post.post.totalLikes = this.post.post.totalLikes + 1;
      }
    );
  }
  

}
