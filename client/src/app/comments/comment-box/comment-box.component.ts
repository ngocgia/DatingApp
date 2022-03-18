import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';
import { BlogCommentViewModel } from '../models/blog-comment-view-model';
import { BlogComment } from '../models/blog-comment.model';
import { BlogCommentCreate } from '../models/blog-comment-create';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() comment!: BlogCommentViewModel;
  @Output() commentSaved = new EventEmitter<BlogComment>();

  @ViewChild('commentForm') commentForm!: NgForm;
  user!: User;
  constructor(private toastr: ToastrService,private accountService: AccountService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private blogCommentService: CommentService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  ngOnInit(): void {

  }
 
  resetComment() {
    this.commentForm.reset();
  }
  
  onSubmit() {
    debugger;
    let blogCommentCreate: BlogCommentCreate = {
      blogCommentId: this.comment.blogCommentId,
      parentBlogCommentId: this.comment.parentBlogCommentId || 0,
      blogsId: this.comment.blogsId,
      content: this.comment.content
    };

    this.blogCommentService.createComment(blogCommentCreate).subscribe(blogComment => {
      this.toastr.info("Comment saved.");
      this.resetComment();
      this.commentSaved.emit(blogComment);
      console.log(blogComment);
    })
  }

}
