import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { IconsrowComponent } from './iconsrow/iconsrow.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    HomeComponent,
    IconsrowComponent,
    VideoComponent,
  ],
  imports: [],
  exports: [
    HomeComponent,
    IconsrowComponent,
    VideoComponent,
  ]
})
export class HomeModule { }
