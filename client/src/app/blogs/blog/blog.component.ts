import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { BlogsService } from 'src/app/_services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs!: any;
  id!: number;
  editMode = false;
  constructor(private blogService: BlogsService,  private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBlog();
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
