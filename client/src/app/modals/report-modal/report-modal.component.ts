import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.list.push('PROFIT!!!');
  }

}
