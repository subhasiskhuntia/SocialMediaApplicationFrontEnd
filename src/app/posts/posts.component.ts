import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../classes/post';
import { CommentService } from '../Services/comment.service';
import { PostService } from '../Services/post.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  name: string = sessionStorage.getItem('user')!;
  postContent: string = '';
  userComment: string = '';
  @Input() posts: any;
  likedPosts: any;
  showComments: boolean = false;
  comments: any;
  commentId: number = -1;
  @Input()
  defaultFirstName!: string;
  @Input()
  defaultLastName!: string;
  @Input()
  defaultUserId!: number;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getUserLikes();
    console.log(this.defaultFirstName);
    console.log(this.defaultLastName);
    console.log(this.defaultUserId);
    
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
        this.posts[index].totalLikes = this.posts[index].totalLikes + 1;
      }
    );
  }
  getUserLikes() {
    this.userService.userLikes().subscribe((result) => {
      // console.log(result);
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
          (a: { likePost: { id: number; totalLikes: number } }) => {
            return a.likePost.id != id;
          }
        );
        if (this.posts[index].totalLikes > 0) {
          this.posts[index].totalLikes = this.posts[index].totalLikes - 1;
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
      console.log(result);

      this.comments = result;
    });
  }

}
