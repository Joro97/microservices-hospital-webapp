import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

 /** A router wrapper, adding extra functions. */
@Injectable()
export class RouterExtService {

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(public router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getCurrentUrl() {
    return this.currentUrl;
  }

  public getBaseUrl() {
    const currRoute = this.getCurrentUrl();
    return currRoute.substr(0, currRoute.indexOf('(sign:'));
  }

  public getPreviousUrl() {
    if (this.previousUrl) {
        return this.previousUrl;
    } else {
        return '';
    }
  }
}
