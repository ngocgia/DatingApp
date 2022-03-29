import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BlogsService } from 'src/app/_services/blogs.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-post',
  templateUrl: './member-post.component.html',
  styleUrls: ['./member-post.component.css']
})
export class MemberPostComponent implements OnInit {
  @Input() username: string = "";
  @Input() members: string="";
  blogs!: any;
  member!: Member;
  user!: User;
  constructor( private blogService:BlogsService,private route: ActivatedRoute,
     private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user == user);
   }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
    })
    this.getBlogByUsername();
  }

  getBlogByUsername(){
    this.blogService.getBlogByUserName(this.member.username).subscribe(blog => {
      this.blogs = blog;
      console.log("Day laf ben getBlogUSER", this.blogs);
    })
  }
}
