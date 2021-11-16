import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { multicast } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm!: FormGroup;
  constructor(private accountService: AccountService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('Hello', Validators.required),
      password: new FormControl('', [Validators.required, 
        Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    })
  }

  matchValues(matchTo: any): ValidatorFn{ 

    return (control: AbstractControl): ValidationErrors | null =>{
      const match = matchTo.test(control.value);
      return match ? {confirmPassword: {value: control.value}} :null;
    }
    // return (control: AbstractControl)  => {
    //   return control?.value === control?.parent?.controls[matchTo].value 
    //     ? null : {isMatching: true}
    // }
    // };
  }

  register(){
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe(response =>{
    //   console.log(response);
    //   this.toastr.success("Đăng ký thành công!!😍");
    //   this.cancel();
    // }, error =>{
    //   console.log(error);
    //   this.toastr.error(error.error);
    // });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
