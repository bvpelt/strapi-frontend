import { Component } from '@angular/core';
import { MessageService } from './services/message.service';

const navClass: string = "nav-link";
const navActiveClass: string = navClass + " active";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'strapi-frontend';

  constructor(private messageService: MessageService) { }

  activateRoute(): void {
    this.messageService.add("clicked route");

  }
}
