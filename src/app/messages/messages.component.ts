import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages = this.getMessages();
  
  constructor(private messageSerivce: MessageService) { }

  ngOnInit(): void {
  }

  getMessages() {
    return this.messageSerivce.messages;
  }
}
