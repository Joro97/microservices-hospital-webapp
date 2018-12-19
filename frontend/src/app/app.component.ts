import { Component } from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Asclepius';

  constructor(private authenticationService: AuthenticationService) {}
}
