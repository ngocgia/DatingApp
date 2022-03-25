import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';
import { environment } from 'src/environments/environment';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  showMore = false;
  sendFile = false;
  showSearch = false;
  loading = false;
  content!:string;
  user!: User;

  constructor(public messageService: MessageService) {}

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
  showSendFile(){
    this.sendFile = !this.sendFile;
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
