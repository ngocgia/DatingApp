import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Comment } from 'src/app/_models/comment';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
 @Input() comments!: Comment[];
 deleteConfirm: boolean = false;
 user!:User;
  constructor(public accountService: AccountService,private commentService : CommentService, private route: ActivatedRoute, private toastr: ToastrService,) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
  }

  deleteComment(blogCommentId: number ){
    this.commentService.deleteComment(blogCommentId).subscribe(()=>{
  
      this.comments?.splice(this.comments.findIndex(x => x?.blogCommentId === blogCommentId), 1);
      this.toastr.info("Blog comment deleted.");
    })
  }
  showDeleteConfirm() {
    this.deleteConfirm = true;
  }
  CancelDeleteConfirm(blogCommentId: number) {
    this.deleteConfirm = false;
  }
  
}
