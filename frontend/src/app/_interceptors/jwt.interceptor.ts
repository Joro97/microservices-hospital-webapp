import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currUser = this.authenticationService.currentUserValue;
    if  (currUser && currUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currUser.token}`
        }
        });
    }

    return next.handle(request);
  }
}
