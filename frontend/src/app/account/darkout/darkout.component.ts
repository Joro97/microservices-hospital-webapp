import { Component, OnInit } from '@angular/core';
import { RouterExtService } from '../../_services/router.ext.service';

@Component({
  selector: 'app-darkout',
  templateUrl: './darkout.component.html',
  styleUrls: ['./darkout.component.css']
})
export class DarkoutComponent implements OnInit {

  constructor(private routerExtService: RouterExtService) {  }

  ngOnInit() {
  }

  public close() {
    let currRoute = this.routerExtService.getCurrentUrl();
    let redirTo = currRoute.substr(0, currRoute.indexOf('(sign:'));

    this.routerExtService.router.navigateByUrl(redirTo);
  }
}
