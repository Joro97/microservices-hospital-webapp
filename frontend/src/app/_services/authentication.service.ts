import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router , ActivatedRoute} from '@angular/router';
import { User } from '../_models/user';
import { JwtToken } from '../_models/jwt.token';
import * as jwt_decode from "jwt-decode";
import { RouterExtService } from './router.ext.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http: HttpClient,
              private routerExtService: RouterExtService) {}


  login(username: string, password: string) {
    const headers = {
      'Authorization': 'Basic ' + btoa("fooClientIdPassword:secret"),
      'Content-type': 'application/x-www-form-urlencoded'
    }

    let params = new URLSearchParams();
    params.append('username',username);
    params.append('password',password);    
    params.append('grant_type','password');
    params.append('client_id','fooClientIdPassword');

    return this.http.post<JwtToken>('http://localhost:8090/spring-security-oauth-server/oauth/token', params.toString(), {headers})
      .subscribe(token => {
        // TODO: add time of get token for expiration monitoring
        localStorage.setItem('token', JSON.stringify(token));
        console.log(token.access_token);
        this.getCurrentUser();
        this.routerExtService.router.navigate([this.routerExtService.getPreviousUrl()]);
      }, error => {
          alert(error)
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.routerExtService.router.navigate([this.routerExtService.getPreviousUrl()]);
  }

  getCurrentAccessToken(): JwtToken {
    return JSON.parse(localStorage.getItem('token'));
  }

  getCurrentUser(): User {
    let token: JwtToken = this.getCurrentAccessToken();
    let user:User = jwt_decode(token.access_token);
    return user;
  }

  hasTokenExpired() {
    // TODO: implement
    return false;
  }

  isUserLoggedIn() {
    // TODO: implement expiration check
    if(this.getCurrentAccessToken()){
      return true;
    }
    return false;
  }
}