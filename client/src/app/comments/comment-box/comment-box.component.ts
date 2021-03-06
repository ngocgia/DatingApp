import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() blogId!: number;
  commentForm!: FormGroup;
  user!: User;
  commentContent: string = "";
  showEmojiPicker = false;
  constructor(private toastr: ToastrService,private accountService: AccountService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private commentService: CommentService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm(){
    const blogId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.commentForm = this.formBuilder.group({
      blogsId: [blogId],
      content : [''],
    });
  }
  createComment(){
    const blogId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.commentService.createComment(this.commentForm.value, blogId).subscribe(response =>{
      this.toastr.success("CMT thành công!!😍");
      this.commentForm.reset();
      window.location.reload();
    }, error =>{
      this.toastr.error("CMT thất bại!!😢");
    });
  }


  toggleEmojiPicker(){
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  addEmoji(event:any) {
    const { commentContent } = this;
    const text = `${commentContent}${event.emoji.native}`;
    this.commentContent = text;
    this.showEmojiPicker = false;
  }

}
