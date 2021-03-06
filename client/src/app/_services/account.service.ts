import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Google } from '../_models/google';
import { User } from '../_models/user';
import { PresenceService } from './presence.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private presence:PresenceService, private toastr: ToastrService,private router: Router) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response : User)=> {
        const user = response;
        if (user){
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map((user: User) =>{
        if(user) {
         this.setCurrentUser(user);
         this.presence.createHubConnection(user);
        }
        return user;
      })
    )
  }
  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next();
    this.presence.stopHubConnection();
  }

  getDecodedToken(token: string){
    return JSON.parse(atob(token.split('.')[1]));
  }

  validateGoogleAuth(google: Google) {
    this.http.post(this.baseUrl + "account/google-login", google)
      .subscribe((response : any)=> {
        const user = response;
        this.toastr.success("????ng nh???p th??nh c??ng!!????")
        this.router.navigateByUrl('/members');
        if (user){
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      });
  }
}

