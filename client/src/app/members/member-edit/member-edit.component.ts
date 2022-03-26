import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BlogsService } from 'src/app/_services/blogs.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!:NgForm;
  member!:Member;
  user!:User;
  blogs!: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService,
     private toastr: ToastrService , private blogService: BlogsService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadBlogByUserName()
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }
  loadBlogByUserName(){
    this.blogService.getBlogByUserName(this.user.username).subscribe(blog => {
      this.blogs = blog;
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toastr.success("Cập nhật thành công!!😊")
      this.editForm.reset(this.member);
    })
  }

}
