import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import {Role} from '../../_models/Role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userRole = Role;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  userHasRole(role: Role) {
    return this.authenticationService.getCurrentUser().authorities.includes(role);
  }

  isUserLoggedIn() {
    return this.authenticationService.isUserLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
  }
}
