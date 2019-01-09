import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Role } from '../../core/models/Role';
import { RouterExtService } from '../../core/services/router.ext.service';
import { NotificationService } from '../../core/services/notification.service';

const toastrNotifications = {
  logoutMessage: 'Goodbye ',
  logoutTitle: 'Princeton Plainsboro'
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit { // TODO: Decouple home module from navbar
  public userRole = Role;

  constructor(
    protected authenticationService: AuthenticationService,
    private routerExtService: RouterExtService,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.authenticationService.isUserLoggedIn();
  }

  logout() {
    this.notificationService.showSuccess(
      `${toastrNotifications.logoutMessage} ${this.authenticationService.getCurrentUser().user_name}`,
      toastrNotifications.logoutTitle);
    this.authenticationService.logout();
    this.routerExtService.router.navigate(['home']);
  }
}
