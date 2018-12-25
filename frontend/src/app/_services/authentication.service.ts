import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router , ActivatedRoute} from '@angular/router';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  returnUrl:String;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


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

    return this.http.post('http://localhost:8081/spring-security-oauth-server/oauth/token', params.toString(), {headers})
      .subscribe(data => {
        // TODO: add time of get token for expiration monitoring
        localStorage.setItem('token', JSON.stringify(data));
        console.log(localStorage.getItem('token'));
        this.router.navigate([this.returnUrl ]);
      }, error => {
          alert(error)
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate([this.returnUrl]);
  }

  getCurrentAccessToken() {
    console.log("access-token: " + localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  hasTokenExpired() {
    // TODO: implement
    return false;
  }

  isUserLoggedIn() {
    /*if(!this.hasTokenExpired && this.getCurrentAccessToken() != null) {
      return true;
    } else {
      return false;
    }*/
    if(this.getCurrentAccessToken()){
      return true;
    }
    return false;
  }
}


/*
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
export class Foo {
  constructor(
    public id: number,
    public name: string) { }
} 

@Injectable()
export class AppService {
  constructor(
    private _router: Router, private _http: Http){}
 
  obtainAccessToken(loginData){
    let params = new URLSearchParams();
    params.append('username',loginData.username);
    params.append('password',loginData.password);    
    params.append('grant_type','password');
    params.append('client_id','fooClientIdPassword');

    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("fooClientIdPassword:secret")});
    let options = new RequestOptions({ headers: headers });
    console.log(params.toString());
     this._http.post('http://localhost:8081/spring-security-oauth-server/oauth/token', params.toString(), options)
    .map(res => res.json())
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    ); 
  }


  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    this._router.navigate(['/']);
  }

  getResource(resourceUrl) : Observable<Foo>{
    var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = new RequestOptions({ headers: headers });
    return this._http.get(resourceUrl, options)
                   .map((res:Response) => res.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkCredentials(){
    if (!Cookie.check('access_token')){
        this._router.navigate(['/login']);
    }
  } 

  logout() {
    Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}*/