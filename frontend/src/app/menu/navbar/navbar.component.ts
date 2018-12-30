import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import {Role} from '../../_models/Role';
import { RouterExtService } from '../../_services/router.ext.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userRole = Role;

  constructor(protected authenticationService: AuthenticationService,
    private routerExtService: RouterExtService) { }

  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.authenticationService.isUserLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
    this.routerExtService.router.navigate(['home']);
  }
}
