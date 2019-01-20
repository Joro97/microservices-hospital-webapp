import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { IconsrowComponent } from './iconsrow/iconsrow.component';
import { VideoComponent } from './video/video.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    IconsrowComponent,
    VideoComponent,
    FooterComponent,
  ],
  imports: [],
  exports: [
    HomeComponent,
    IconsrowComponent,
    VideoComponent,
  ]
})
export class HomeModule { }
