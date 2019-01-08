import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterExtService } from './core/services/router.ext.service';
import { AccountModule } from './account/account.module';
import { CoreModule } from './core/core.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    MenuModule,
    AccountModule,
    AppRoutingModule,
  ],
  providers: [
    RouterExtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  /* To store the current variable as soon as possible,
   it's necessary to use the service in the AppModule. */
  constructor(private routerExtService: RouterExtService) {}
}
