import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BlogsService } from 'src/app/_services/blogs.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs!: any;
  id!: number;
  user!:User;
  editMode = false;
  constructor(public accountService: AccountService,private blogService: BlogsService,  private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
     }

  ngOnInit(): void {
    this.getBlog();
    console.log(this.user.username);
  }

  getBlog(){
    const blogId = parseInt(this.route.snapshot.paramMap.get('id') || "");
    console.log(blogId);
    this.blogService.getBlog(blogId).subscribe(blogs =>{
      this.blogs = blogs;
    })
  }
  deleteBlog(id: number){
    this.blogService.deleteBlog(id).subscribe(()=>{
      this.toastr.success("Đã xoá");
      this.router.navigateByUrl('/blogs');
    });
      
  }

  editToggle(){
    this.editMode = !this.editMode;
  }

  cancelEditMode(event: boolean){
    this.editMode = event;
  }
}
