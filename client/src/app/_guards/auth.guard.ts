
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accontService: AccountService, private toastr: ToastrService) { }
  canActivate(): Observable<boolean> {
    return this.accontService.currentUser$.pipe(
      map((user: any) => {
        if (user){
          return true;
        } 
        else{
          this.toastr.error('Bạn chưa đăng nhập!!😁');
          return false;
        } 
      })
    );
  }

}