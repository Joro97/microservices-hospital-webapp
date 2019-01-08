import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let canAccess = false;

    if  (this.authenticationService.isUserLoggedIn()) {
      const currUser: User = this.authenticationService.getCurrentUser();
      if (currUser) {
        currUser.authorities.forEach((role) => {
          if (route.data.roles && route.data.roles.includes(role)) {
            canAccess = true;
          }
        });
      }
    }
    return canAccess;
  }
}
