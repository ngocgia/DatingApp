import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
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
}
