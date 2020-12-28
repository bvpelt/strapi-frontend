import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: string[] = [];

  constructor(private messageSerivce: MessageService) { }

  ngOnInit(): void {
    this.messages = this.getMessages();
  }

  getMessages(): string[] {
    return this.messageSerivce.messages;
  }

  clear(): void {
    console.log('MessagesComponent clear');
    this.messageSerivce.clear();
    this.messages = this.getMessages();
  }
}
