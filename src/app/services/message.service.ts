import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string) {
    let now: Date = new Date();
    let nowString: string = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds();
    console.log('MessageService add: ' + message);
    this.messages.push(nowString + ' - ' + message);
  }

  clear() {
    console.log('MessageService clear');
    this.messages = [];
  }
}
