import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpHelper} from './service/httpHelper/http-helper';
import { NavComponent } from './components/nav/nav.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideNavComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [HttpHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
