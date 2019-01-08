import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { IconsrowComponent } from './iconsrow/iconsrow.component';
import { VideoComponent } from './video/video.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRoutingModule } from './home.routing';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    IconsrowComponent,
    VideoComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HomeComponent,
    IconsrowComponent,
    VideoComponent,
  ]
})
export class HomeModule { }
