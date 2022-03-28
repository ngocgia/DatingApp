import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Report } from 'src/app/_models/report';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  pagination!: Pagination;
  reports: Partial<Report[]> = [];
  loading= false;

  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport(){
    this.loading = true;
    this.adminService.getAllReports( this.pageNumber, this.pageSize).subscribe(response => {
      this.reports = response.result;
      console.log("re",this.reports)
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
  deleteReport(id: number){
    this.adminService.deleteReport(id).subscribe(()=>{
      this.reports.splice(this.reports.findIndex((x:any) => x?.id === id), 1);
      this.toastr.success("Đã xoá");
    });
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadReport();
  }
}
