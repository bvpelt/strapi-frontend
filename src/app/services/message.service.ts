import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  private mcount: number = 0;

  constructor() {
  }

  public add(message: string): void {
    let msg: string;
    this.mcount++;
    msg = this.zeroPad(this.mcount, 5) + ': ' + message;
    this.messages.push(msg);
  }

  public clear(): void {
    this.messages = [];
  }

  private zeroPad(num, places): String {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
}