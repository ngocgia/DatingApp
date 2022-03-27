import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Blogs } from 'src/app/_models/blog';
import { Pagination } from 'src/app/_models/pagination';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  blogs!: Blogs[];
  pageNumber = 1;
  pageSize = 5;
  pagination!: Pagination;
  blogss: Partial<Blogs[]> = [];
  loading= false;


  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBlogsForApproval();
    this.loadBlog();
  }

  getBlogsForApproval() {
    this.adminService.getBlogsForApproval().subscribe(blog => {
      this.blogs = blog;
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
  loadBlog(){
    this.loading = true;
    this.adminService.getAllBlogs( this.pageNumber, this.pageSize).subscribe(response => {
      this.blogss = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadBlog();
  }
  
  deleteBlog(id: number){
    this.adminService.deleteBlog(id).subscribe(()=>{
      this.blogss?.splice(this.blogss.findIndex(x => x?.id === id), 1);
      this.toastr.success("Đã xoá");
  
    });
      
  }
}
