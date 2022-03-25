import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() messages: Message[] = [] ;
  @Input() username: string = "";
  messageContent: string = "";
  showEmojiPicker = false;
  loading = false;
  showMore = false;
  showSearch = false;
  content!:string;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    
  }

  sendMessage(){
    this.loading = true;
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    }).finally(() => this.loading = false);
  }
  toggleEmojiPicker(){
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  showMoreIcon(){
    this.showMore = !this.showMore;
  }
  showSearchMessage(){
    this.showSearch = !this.showSearch;
  }
  addEmoji(event:any) {
    const { messageContent } = this;
    const text = `${messageContent}${event.emoji.native}`;
    this.messageContent = text;
    this.showEmojiPicker = false;
  }
  deleteMessage(id: number){
    this.messageService.deleteMessage(id).subscribe(() =>{
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }
  
}
