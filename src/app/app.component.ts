import { Component } from '@angular/core';
import { MessageService } from './services/message.service';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { HelptekstService } from './services/helptekst.service';
import { Helptekst } from './model/helptekst.model';


const navClass = 'nav-link';
const navActiveClass: string = navClass + ' active';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'strapi-frontend';
  faQuestionCircle = faQuestionCircle;
  error = '';
  helpmsg = '';

  constructor(private helptekstService: HelptekstService, private messageService: MessageService) { }

  activateRoute(): void {
    this.messageService.add('clicked route');
  }


  clearError(): void {
    this.error = '';
  }

  clearHelp(): void {
    this.helpmsg = '';
  }

  showHelpByHelpId(helpid: string): void {
    this.clearError();
    let helpresponse: Helptekst[];
    this.messageService.add('AppComponent - showHelpByHelpId for helpid: ' + helpid);
    this.helptekstService.getHelptekstByHelpId(helpid)
      .subscribe(
        (response => {
          this.messageService.add('AppComponent - Result ' + JSON.stringify(response));
          helpresponse = response;
          if (helpresponse.length === 1) { // only one answer expected since helpid is unique identifier!!!
            this.helpmsg = helpresponse[0].helptekst;
          }
        }),
        (error => {
          this.messageService.add('AppComponent - Error ' + JSON.stringify(error));
          this.error = error.statusText;
        }),
        (() => { })
      );
  }
}
