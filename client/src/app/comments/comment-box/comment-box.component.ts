import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
      content : ['']
    });
    console.log("vaule comment:", this.commentForm.value);
  }
  createComment(){
    const blogId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.commentService.createComment(this.commentForm.value, blogId).subscribe(response =>{
      this.toastr.success("CMT thành công!!😍");
      // window.location.reload();
      this.commentForm.reset();
      console.log("dúng",response);
    }, error =>{
      this.toastr.error("CMT thất bại!!😢");
    });
  }

}
