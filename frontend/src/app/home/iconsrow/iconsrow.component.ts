import { Component, OnInit } from '@angular/core';

declare var buildIcons: any;
declare var playRandom: any;
declare var renderPage: any;

@Component({
  selector: 'app-iconsrow',
  templateUrl: './iconsrow.component.html',
  styleUrls: ['./iconsrow.component.css']
})
export class IconsrowComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit() {
    buildIcons();
    renderPage(); 

    setInterval(playRandom, 1000);
  }

  
}
