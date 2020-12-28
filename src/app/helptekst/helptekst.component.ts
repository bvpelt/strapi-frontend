import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  addButton: boolean = true;

  constructor(private helptekstService: HelptekstService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.getHelptekst();
      this.addButton = false;
    } else {
      this.addButton = true;
    }

  }

  addHelptekst(): void {
    // check if helptekst is valid
    if (this.validHelptekst()) {
      this.messageService.add('added valid helptekst: ' + this.helptekst.helpid + ' ' + JSON.stringify(this.helptekst));
      console.log('adding helptekst:' + JSON.stringify(this.helptekst));
      this.helptekstService.addHelptekst(this.helptekst)
        .subscribe(
          (response => { this.messageService.add('Result: ' + JSON.stringify(response)) }),
          (error => { this.messageService.add('Error ' + JSON.stringify(error)) })
        );
    } else {
      this.error = "Both helpid and helpmessage are required"
      this.messageService.add(this.error);
    }
  }

  updateHelptekst(): void {
    console.log('update helptekst:' + JSON.stringify(this.helptekst));
    this.helptekstService.updateHelptekst(this.helptekst)
      .subscribe(
        (response => { this.messageService.add('Result: ' + JSON.stringify(response)) }),
        (error => { this.messageService.add('Error ' + JSON.stringify(error)) })
      );
  }

  deleteHelptekst(): void {
    console.log('delete helptekst:' + JSON.stringify(this.helptekst));
    this.helptekstService.deleteHelptekst(this.helptekst)
      .subscribe(
        (response => { this.messageService.add('Result: ' + JSON.stringify(response)) }),
        (error => { this.messageService.add('Error ' + JSON.stringify(error)) })
      );
  }

  getHelptekst(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.helptekstService.getHelptekstById(id)
      .subscribe(
        (helptekst => this.helptekst = helptekst),
        (error => this.error = error));
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
