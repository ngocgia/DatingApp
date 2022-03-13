import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Blogs } from 'src/app/_models/blog';
import { BlogsService } from 'src/app/_services/blogs.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit, OnDestroy{
  @Output() cancelEdit = new EventEmitter();
  @ViewChild('editBlogForm') editBlogForm!:NgForm;
  // blogs!: Blogs;
  blog!:any;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(private blogService: BlogsService, private toastr: ToastrService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBlog();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  updateBlog(){
    const blogId = parseInt(this.route.snapshot.paramMap.get('id') || "");
    this.blogService.updateBlog(this.blog).subscribe(() =>{
      this.toastr.success("Cập nhật blog thành công");
      this.editBlogForm.reset(this.blog);
      this.router.navigateByUrl('/blogs');
    })
  }

  loadBlog(){
    const blogId = parseInt(this.route.snapshot.paramMap.get('id') || "");
    this.blogService.getBlog(blogId).subscribe(blog => {
      this.blog = blog;
      console.log(blog);
    })
  }
  cancel(){
    this.cancelEdit.emit(false);
  }
}
