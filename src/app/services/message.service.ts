import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string) {
    console.log('MessageService add: ' + message);
    this.messages.push(message);
  }

  clear() {
    console.log('MessageService clear');
    this.messages = [];
  }
}
