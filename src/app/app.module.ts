import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HnHttpModule} from 'hn-http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HnHttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
