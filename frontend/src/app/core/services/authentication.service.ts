import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/user';
import { JwtToken } from '../models/jwt.token';
import { RouterExtService } from './router.ext.service';
import { Role } from '../models/Role';
import { map, catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authServiceUrl: String = 'http://localhost:8090/spring-security-oauth-server';

  constructor(private http: HttpClient,
              private routerExtService: RouterExtService) {}


  login(username: string, password: string) {
    const headers = {
      'Authorization': 'Basic ' + btoa('fooClientIdPassword:secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
    params.append('client_id', 'fooClientIdPassword');

    return this.http.post<JwtToken>(this.authServiceUrl + '/oauth/token', params.toString(), {headers})
      .pipe(
        map(token => {
          // TODO: add time of get token for expiration monitoring
          localStorage.setItem('token', JSON.stringify(token));
          console.log(token.access_token);
          return true;
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
  }

  getCurrentAccessToken(): JwtToken {
    return JSON.parse(localStorage.getItem('token'));
  }

  getCurrentUser(): User {
    const token: JwtToken = this.getCurrentAccessToken();
    const user: User = jwt_decode(token.access_token);
    return user;
  }

  hasTokenExpired() {
    // TODO: implement
    return false;
  }

  isUserLoggedIn() {
    // TODO: implement expiration check
    if (this.getCurrentAccessToken()) {
      return true;
    }
    return false;
  }

  registerUser(userToRegister) {
    return this.http.post(this.authServiceUrl + '/register/user', userToRegister)
    .subscribe(response => {
      console.log('Registration was successful');
    }, error => {
      console.log('error:' + error);
    });
  }

  userHasRole(role: Role) {
    return this.getCurrentUser().authorities.includes(role);
  }
}
