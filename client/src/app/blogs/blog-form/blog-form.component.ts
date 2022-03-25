import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { BlogsService } from 'src/app/_services/blogs.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit, OnDestroy {
  @Output() cancelBlog = new EventEmitter();
  blogForm!: FormGroup;
  validationErrors: string[] = [];
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
  constructor(private blogService: BlogsService, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  intitializeForm(){
    const blogId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.blogForm = this.formBuilder.group({
      blogId: [blogId],
      title: ['', [
        Validators.required,
      ]],
      content : ['', [
        Validators.required,
      ]],
      photoId: [null]
    });
  }

  createBlog(){
    this.blogService.createBlog(this.blogForm.value).subscribe(response =>{
      this.toastr.success("Tạo blog thành công!!😍");
      this.cancel();
      // window.location.reload();
    }, error =>{
      this.validationErrors = error;
      this.toastr.error("Đăng bài thất bại!!😢");
    });
  }

  cancel(){
    this.cancelBlog.emit(false);
  }

}
