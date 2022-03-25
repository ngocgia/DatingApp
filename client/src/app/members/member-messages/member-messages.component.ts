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

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    
  }

  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }
  toggleEmojiPicker(){
    this.showEmojiPicker = !this.showEmojiPicker;
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
  
  clickFile(){
    document.getElementById("file_attach_upload")?.click();
  
  }
  clickImage(){
    document.getElementById("image_attach_upload")?.click();
  }

  
  
}
