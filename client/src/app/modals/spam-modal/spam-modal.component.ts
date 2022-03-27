import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-spam-modal',
  templateUrl: './spam-modal.component.html',
  styleUrls: ['./spam-modal.component.css']
})
export class SpamModalComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.list.push('PROFIT!!!');
  }

  
}
