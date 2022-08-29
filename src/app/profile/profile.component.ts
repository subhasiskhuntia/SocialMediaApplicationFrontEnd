import { Component, OnInit } from '@angular/core';
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
  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService
  ) {}
  user: any;
  userComment: string = '';
  likedPosts: any;
  userComments:any;
  showComments: boolean = false;
  comments: any;
  commentId: number = -1;
  showLikes:boolean=false;
  usersLikeOnPosts:any;
  ngOnInit(): void {
    this.loadUser();
    this.loadUserComments();
    this.getUsersLikeOnPost();
  }
  loadUser() {
    this.userService.loadUser().subscribe((result) => {
      this.user = result;
      console.log(result);
    });
  }
  likeThisPost(post: Post, index: number) {
    console.log(post);

    this.postService.likeThisPost(post).subscribe(
      (result) => console.log(result),
      (error) => console.log(error),
      () => {
        this.likedPosts.push({
          id: this.likedPosts?.[this.likedPosts.length - 1]?.id + 1,
          likeBy: null,
          likePost: post,
          createdAt: new Date(),
        });
        this.user.posts[index].total_likes = this.user.posts[index].total_likes + 1;
      }
    );
  }
  getUserLikes() {
    this.userService.userLikes().subscribe((result) => {
      console.log(result);
      this.likedPosts = result;
    });
  }
  likedOrNot(id: number): boolean {
    for (let i = 0; i < this.likedPosts?.length; i++) {
      if (this.likedPosts[i].likePost.id == id) {
        return true;
      }
    }
    return false;
  }
  removeLike(id: number, index: number) {
    this.postService.removeLikes(id).subscribe(
      (result) => console.log(result),
      (error) => console.log(error),
      () => {
        this.likedPosts = this.likedPosts.filter(
          (a: { likePost: { id: number; total_likes: number } }) => {
            return a.likePost.id != id;
          }
        );
        if (this.user?.posts[index].total_likes > 0) {
          this.user.posts[index].total_likes = this.user.posts[index].total_likes - 1;
        }
      }
    );
  }
  toggleCommentButton(id: number) {
    this.showComments = this.commentId!=id;
    if (this.showComments == false) {
      this.commentId = -1;
    } else {
      this.commentId = id;
    }

    this.showCommentsOnAPost(id);
  }
  addComment(id: number) {
    this.commentService.addComment(this.userComment, id).subscribe(
      (result) => console.log(result),
      (error) => console.log(error),
      () => this.showCommentsOnAPost(id)
    );
    this.userComment = '';
  }
  showCommentsOnAPost(id: number) {
    this.commentService.showCommentOnAPost(id).subscribe((result) => {
      // console.log(result);

      this.comments = result;
    });
  }
  loadUserComments(){
    this.userService.userComments().subscribe(result=>{
      this.comments=result;
      console.log(result);
      
    }
    );
  }
  toggleShowUserComments(){
    this.showComments=!this.showComments;
  }
  toggleShowUserLikes(){
    this.showLikes=!this.showLikes;
  }
  getUsersLikeOnPost(){
    this.userService.getUsersLikeOnPosts().subscribe(result=>this.usersLikeOnPosts=result
    )
  }
}
