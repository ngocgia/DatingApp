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
 isEditable: boolean = false;
 user!:User;
  constructor(public accountService: AccountService,private commentService : CommentService, private route: ActivatedRoute, private toastr: ToastrService,) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    
  }

  deleteComment(comment:Comment, comments:Comment[] ){
    this.commentService.deleteComment(comment.blogCommentId).subscribe(()=>{
      let index = 0;
      for(let i = 0; i< comments.length; i++){
        if(comments[i].blogCommentId === comment.blogCommentId){
          index = i;
        }
      }

      if(index > -1){
        comments.slice(index, 1);
      }
      this.toastr.info("Blog comment deleted.");
    })
  }
  editComment(){
    this.isEditable = !this.isEditable;
  }
  
}
