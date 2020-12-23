import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HelptekstsComponent} from './helpteksts/helpteksts.component';
import { HelptekstComponent } from './helptekst/helptekst.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HelptekstsComponent,
    HelptekstComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
