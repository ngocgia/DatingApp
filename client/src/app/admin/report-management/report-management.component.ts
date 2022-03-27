import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ReportModalComponent } from 'src/app/modals/report-modal/report-modal.component';
import { Pagination } from 'src/app/_models/pagination';
import { Report } from 'src/app/_models/report';
import { Reported } from 'src/app/_models/reported';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  reported!: Reported[]; // bi report
  reports!: Report[] | any; //report 
  pageNumber = 1;
  pageSize = 5;
  pagination!: Pagination;
  reporteds: Partial<Reported[]> = [];
  loading= false;
  bsModalRef?: BsModalRef;
  constructor(private adminService: AdminService, private toastr: ToastrService,  private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadReport();
  }
  getReport(id : number){
    this.adminService.getReport(id).subscribe(res =>{
      this.reports = res;
      console.log(res);
    })

  }
  loadReport(){
    this.loading = true;
    this.adminService.getAllReport( this.pageNumber, this.pageSize).subscribe(response => {
      this.reporteds = response.result;
      console.log("sss",this.reporteds)
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadReport();
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        list:[
          
        ],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(ReportModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
