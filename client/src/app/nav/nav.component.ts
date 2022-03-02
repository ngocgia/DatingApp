import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;
  constructor(public accountService: AccountService, private router: Router,
     private toastr: ToastrService, private translate: TranslateService) {
       translate.setDefaultLang("vn");
       translate.use("en");
      }

  ngOnInit(): void {
  
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      console.log('get current user: ', user); 
      this.loggedIn = !!user; 
    })
  }

  switchLanguage(language: string){
    this.translate.use(language);
  }

}