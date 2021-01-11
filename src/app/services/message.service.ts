import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string) {
    const now: Date = new Date();
    const nowString: string = now.getFullYear() + '-' + now.getMonth() + '-' +
      now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds();
    this.messages.push(nowString + ' - ' + message);
  }

  clear() {
    this.messages = [];
  }
}
