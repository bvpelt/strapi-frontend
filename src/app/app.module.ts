import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelptekstComponent } from './helptekst/helptekst.component';
import { HelptekstsComponent } from './helpteksts/helpteksts.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HelptekstsComponent,
    HelptekstComponent,
    HomeComponent,
    PagenotfoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
