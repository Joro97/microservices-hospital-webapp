import { Component, OnInit } from '@angular/core';
import { RouterExtService } from '../../core/services/router.ext.service';

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
    this.routerExtService.router.navigateByUrl(this.routerExtService.getBaseUrl());
  }
}
