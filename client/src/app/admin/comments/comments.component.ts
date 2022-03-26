import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  pagination!: Pagination;
  comments: any;
  loading= false;
  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadComment();
  }

  loadComment(){
    this.loading = true;
    this.adminService.getAllComment( this.pageNumber, this.pageSize).subscribe(response => {
      this.comments = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadComment();
  }
  
  deleteComment(id: number){
    this.adminService.deleteComment(id).subscribe(()=>{
      this.comments.splice(this.comments.findIndex((x:any) => x?.id === id), 1);
      this.toastr.success("Đã xoá");
  
    });
  }
}
