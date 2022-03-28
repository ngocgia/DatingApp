import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reports-modal',
  templateUrl: './reports-modal.component.html',
  styleUrls: ['./reports-modal.component.css']
})
export class ReportsModalComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
   
  }

}
