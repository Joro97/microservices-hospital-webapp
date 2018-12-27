import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const currUser: User = this.authenticationService.getCurrentUser();
    let canAccess = false;
    if (currUser) {
      currUser.authorities.forEach((role) => {
        if (route.data.roles && route.data.roles.includes(role)) {
          canAccess = true;
        }
      });
    }
    return canAccess;
  }
}
