import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @Output() cancelReport = new EventEmitter();
  @ViewChild('memberTabs', {static: true}) memberTabs!: TabsetComponent;
  member!: Member;
  galleryOptions!: NgxGalleryOptions[] ;
  galleryImages!: NgxGalleryImage[] ;
  activeTab!: TabDirective;
  messages: Message[] = [];
  user!: User;
  showMore = false;
  myModal= false;
  reportForm!: FormGroup;


  constructor(public presence: PresenceService,
     private route: ActivatedRoute, 
     private messageService: MessageService,
     private accountService: AccountService,
     private toastr: ToastrService,
     private memberService: MembersService,
     private formBuilder: FormBuilder
     ) { 
       this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
     }
 
  ngOnInit(): void {
    this.intitializeForm();
   console.log("form",this.intitializeForm());
   this.route.data.subscribe(data => {
     this.member = data.member;
   })

   console.log(this.member.username);
    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      }
    ]

    this.galleryImages = this.getImages();
  }
  showMoreIcon(){
    this.showMore = !this.showMore;
  }
  showMyModal(){
    this.myModal = !this.myModal;
  }

  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      })
    }
    return imageUrls;
  }
  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
      console.log(messages);
    })
  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === "Messages" && this.messages.length === 0){
      this.messageService.createHubConnection(this.user, this.member.username);
    }else {
      this.messageService.stopHubConnection();
    }
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(()=>{
      this.toastr.success("Bạn đã LIKE " + member.knownAs);
    })
  }
  addBlock(member: Member) {
    this.memberService.addBlock(member.username).subscribe(()=>{
      this.toastr.success("Bạn đã BLOCK " + member.knownAs);
    })
  }
 
  intitializeForm(){
    const recipient = this.route.snapshot.paramMap.get('username')!
    this.reportForm = this.formBuilder.group({
      recipientReportName: [recipient],
      reason:[""],
    });
  }
  createReport(){
    this.memberService.createReport(this.reportForm.value).subscribe(res =>{
      this.toastr.success("Report thành công!!😁");
      this.myModal= false;
    }, error =>{
      this.toastr.error("Report thất bại!!");
    })
  }
  cancel(){
    this.cancelReport.emit(false);
  }

}


