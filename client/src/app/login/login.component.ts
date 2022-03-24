import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Google } from '../_models/google';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  loginForm!: FormGroup;
  validationErrors: string[] = [];
  model: any = {};
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor(public accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router,  private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.toastr.success("Đăng nhập thành công!!😍")
      this.router.navigateByUrl('/members');
    }, error =>{
      console.log(error);
      this.toastr.error("Tài khoản hoặc mật khẩu không đúng !!😒");
    });
  }

  cancel(){
    this.cancelLogin.emit(false);
    console.log("cancel");
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).
    then( res => {
      const user: SocialUser = { ...res };
      const googleAuth: Google = {
        provider: user.provider,
        idToken: user.idToken
      }
      this.accountService.validateGoogleAuth(googleAuth);
    }).catch(e => {
      console.log(e);
    });
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
