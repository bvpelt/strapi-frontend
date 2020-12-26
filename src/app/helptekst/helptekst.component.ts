import { Component, OnInit } from '@angular/core';
import { Helptekst } from '../model/helptekst.model';
import { HelptekstService } from '../services/helptekst.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-helptekst',
  templateUrl: './helptekst.component.html',
  styleUrls: ['./helptekst.component.css']
})
export class HelptekstComponent implements OnInit {

  helptekst: Helptekst = new Helptekst();
  error: string;

  constructor(private helptekstService: HelptekstService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addHelptekst(): void {
    // check if helptekst is valid
    if (this.validHelptekst()) {
      this.messageService.add('added valid helptekst: ' + this.helptekst.helpid + ' ' + JSON.stringify(this.helptekst));
      console.log('adding helptekst:' + JSON.stringify(this.helptekst));
      this.helptekstService.addHelptekst(this.helptekst)
        .subscribe(response => { console.log('Result: ' + JSON.stringify(response)) },
          error => { console.log('Error ' + JSON.stringify(error)) });
    } else {
      this.error = "Both helpid and helpmessage are required"
      this.messageService.add(this.error);
    }
  }

  validHelptekst(): boolean {
    var result: boolean = false;

    if (typeof (this.helptekst.helpid) != "undefined") {
      if (this.helptekst.helpid.length > 0) {
        result = true;
      } else {
        result = false;
      }
    }

    if (result == true) {
      if (typeof (this.helptekst.helptekst) != "undefined") {
        if (this.helptekst.helptekst.length === 0) {
          result = false;
        }
      } else {
        result = false;
      }
    }

    return result;
  }

  clearError(): void {
    this.error = "";
  }
}
