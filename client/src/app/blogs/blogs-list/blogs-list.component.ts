import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/_models/blog';
import { Pagination } from 'src/app/_models/pagination';
import { BlogsService } from 'src/app/_services/blogs.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  pagination!: Pagination;
  blogs: Partial<Blogs[]> = [];
  blogMode = false;

  constructor(private blogService: BlogsService) { }

  ngOnInit(): void {
    this.loadBlog();
  }

  loadBlog(){
    this.blogService.getAllBlogs( this.pageNumber, this.pageSize).subscribe(response => {
      this.blogs = response.result;
      this.pagination = response.pagination;
    })
  }
  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadBlog();
  }
  
  blogToggle(){
    this.blogMode = !this.blogMode;
  }

  cancelBlogMode(event: boolean){
    this.blogMode= event;
  }

}
