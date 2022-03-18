import { Component, Input, OnInit } from '@angular/core';
import { first, take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
// import { Comment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';
import { BlogCommentViewModel } from '../models/blog-comment-view-model';
import { BlogComment } from '../models/blog-comment.model';

@Component({
  selector: 'app-comment-system',
  templateUrl: './comment-system.component.html',
  styleUrls: ['./comment-system.component.css']
})
export class CommentSystemComponent implements OnInit {
  @Input() blogId!: number;

  standAloneComment!: BlogCommentViewModel;
  blogComments!: BlogComment[] | any;
  blogCommentViewModels!: BlogCommentViewModel[];

  user!:User;
  constructor(private blogCommentService: CommentService, public accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.blogCommentService.getAllComment(this.blogId).subscribe(blogComments => {

      if (this.accountService.currentUser$) {
        this.initComment(this.user.username);
      }

      this.blogComments = blogComments;
      this.blogCommentViewModels = [];

      for (let i=0; i<this.blogComments.length; i++) {
        if (!this.blogComments[i].parentBlogCommentId) {
          this.findCommentReplies(this.blogCommentViewModels, i);
        }
      }

    });
  }
  // ----------------
  initComment(username: string) {
    this.standAloneComment = {
      parentBlogCommentId: 0,
      content: '',
      blogsId: this.blogId,
      blogCommentId: -1,
      username: username,
      publishDate: null,
      updateDate: null,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    };
  }
  // ---------------------------
  findCommentReplies(blogCommentViewModels: BlogCommentViewModel[], index: number) {

    let firstElement = this.blogComments[index];
    let newComments: BlogCommentViewModel[] = [];

    let commentViewModel: BlogCommentViewModel = {
      parentBlogCommentId: firstElement.parentBlogCommentId || 0,
      content: firstElement.content,
      blogsId: firstElement.blogId,
      blogCommentId: firstElement.blogCommentId,
      username: firstElement.username,
      publishDate: firstElement.publishDate,
      updateDate: firstElement.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: newComments
    }

    blogCommentViewModels.push(commentViewModel);

    for (let i=0; i<this.blogComments.length; i++) {
      if (this.blogComments[i].parentBlogCommentId === firstElement.blogCommentId) {
        this.findCommentReplies(newComments, i);
      }
    }
  }
  // ------------------
  onCommentSaved(blogComment: BlogComment) {
    let commentViewModel: BlogCommentViewModel = {
      parentBlogCommentId: blogComment.parentBlogCommentId || 0,
      content: blogComment.content,
      blogsId: blogComment.blogsId,
      blogCommentId: blogComment.blogCommentId,
      username: blogComment.username,
      publishDate: blogComment.publishDate,
      updateDate: blogComment.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    }

    this.blogCommentViewModels.unshift(commentViewModel);
  }
  
}
