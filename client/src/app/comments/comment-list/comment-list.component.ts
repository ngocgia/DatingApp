import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';
import { BlogCommentViewModel } from '../models/blog-comment-view-model';
import { BlogComment } from '../models/blog-comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() comments!: BlogCommentViewModel[];
 user!:User;
  constructor(public accountService: AccountService,private blogCommentService : CommentService, private route: ActivatedRoute, private toastr: ToastrService,) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    
  }
  editComment(comment: BlogCommentViewModel) {
    comment.isEditable = true;
  }

  showDeleteConfirm(comment: BlogCommentViewModel) {
    comment.deleteConfirm = true;
  }

  cancelDeleteConfirm(comment: BlogCommentViewModel) {
    comment.deleteConfirm = false;
  }

  deleteConfirm(comment: BlogCommentViewModel, comments: BlogCommentViewModel[]) {
    this.blogCommentService.deleteComment(comment.blogCommentId).subscribe(() => {

      let index = 0;

      for(let i=0; i<comments.length; i++) {
        if (comments[i].blogCommentId === comment.blogCommentId) {
          index = i;
        }
      }

      if (index > -1) {
        comments.splice(index, 1);
      }

      this.toastr.info("Blog comment deleted.");
    });
  }

  replyComment(comment: BlogCommentViewModel) {
    let replyComment: BlogCommentViewModel = {
      parentBlogCommentId: comment.blogCommentId || 0,
      content: '',
      blogsId: comment.blogsId,
      blogCommentId: -1,
      username: this.user.username,
      publishDate: new Date(),
      updateDate: new Date(),
      isEditable: false,
      deleteConfirm: false,
      isReplying: true,
      comments: []
    };

    comment.comments.push(replyComment);
  }

  onCommentSaved(blogComment: BlogComment, comment: BlogCommentViewModel) {
    comment.blogCommentId = blogComment.blogCommentId;
    comment.parentBlogCommentId = blogComment.parentBlogCommentId || 0;
    comment.blogsId = blogComment.blogsId;
    comment.content = blogComment.content;
    comment.publishDate = blogComment.publishDate;
    comment.updateDate = blogComment.updateDate;
    comment.username = blogComment.username;
    comment.isEditable = false;
    comment.isReplying = false;
  }

  
}
