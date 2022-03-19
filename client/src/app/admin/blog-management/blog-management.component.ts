import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/_models/blog';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  blogs!: Blogs[];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBlogsForApproval();
  }

  getBlogsForApproval() {
    this.adminService.getBlogsForApproval().subscribe(blog => {
      this.blogs = blog;
      console.log(blog);
    })
  }

  approveBlog(blogId: any) {
    this.adminService.approveBlog(blogId).subscribe(() => {
      this.blogs.splice(this.blogs.findIndex(p => p.id === blogId), 1);
      console.log()
    })
  }

  rejectBlog(blogId : any) {
    this.adminService.rejectBlog(blogId).subscribe(() => {
      this.blogs.splice(this.blogs.findIndex(p => p.id === blogId), 1);
    })
  }
}
