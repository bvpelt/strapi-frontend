import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Helptekst } from '../model/helptekst.model';
import { HelptekstService } from '../services/helptekst.service';
import { MessageService } from '../services/message.service';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-helptekst',
  templateUrl: './helptekst.component.html',
  styleUrls: ['./helptekst.component.css']
})
export class HelptekstComponent implements OnInit {

  helptekst: Helptekst = new Helptekst();
  helpmsg: string;
  error: string;
  addButton: boolean = true;
  faQuestionCircle = faQuestionCircle;

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
      this.messageService.add('HelptekstComponent - added valid helptekst: ' + this.helptekst.helpid + ' ' + JSON.stringify(this.helptekst));
      this.helptekstService.addHelptekst(this.helptekst)
        .subscribe(
          (response => { this.messageService.add('HelptekstComponent - Result: ' + JSON.stringify(response)) }),
          (error => {
            this.messageService.add('HelptekstComponent - Error ' + JSON.stringify(error));
            this.error = error.statusText;
          }),
          (() => { this.helptekst = new Helptekst(); })
        );
    } else {
      this.error = "Both helpid and helpmessage are required"
      this.messageService.add(this.error);
    }
  }

  updateHelptekst(): void {
    this.messageService.add('HelptekstComponent - update helptekst:' + JSON.stringify(this.helptekst));
    this.helptekstService.updateHelptekst(this.helptekst)
      .subscribe(
        (response => { this.messageService.add('HelptekstComponent - Result: ' + JSON.stringify(response)) }),
        (error => {
          this.messageService.add('HelptekstComponent - Error ' + JSON.stringify(error));
          this.error = error.statusText;
        }),
        (() => { })
      );
  }

  deleteHelptekst(): void {
    this.messageService.add('HelptekstComponent - delete helptekst:' + JSON.stringify(this.helptekst));
    this.helptekstService.deleteHelptekst(this.helptekst)
      .subscribe(
        (response => { this.messageService.add('HelptekstComponent - Result: ' + JSON.stringify(response)) }),
        (error => {
          this.messageService.add('HelptekstComponent - Error ' + JSON.stringify(error));
          this.error = error.statusText;
        }),
        (() => { })
      );
  }

  getHelptekst(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.helptekstService.getHelptekstById(id)
      .subscribe(
        (helptekst => this.helptekst = helptekst),
        (error => {
          this.messageService.add('HelptekstComponent - Error ' + JSON.stringify(error));
          this.error = error.statusText;
        }),
        (() => { })
      );
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

  goBack(): void {
    this.location.back();
  }

  showHelp(id: number): void {
    this.clearError();
    this.messageService.add('HelptekstComponent - showHelp for id: ' + id);
    this.helptekstService.getHelptekstById(id)
      .subscribe(
        (response => { this.helpmsg = response.helptekst }),
        (error => {
          this.messageService.add('HelptekstComponent - Error ' + JSON.stringify(error));
          this.error = error.statusText;
        }),
        (() => { })
      )
  }

  showHelpByHelpId(helpid: string): void {
    this.clearError();
    var helpresponse: Helptekst[];
    this.messageService.add('HelptekstComponent - showHelpByHelpId for helpid: ' + helpid);
    this.helptekstService.getHelptekstByHelpId(helpid)
      .subscribe(
        (response => {
          this.messageService.add('HelptekstComponent - Result ' + JSON.stringify(response));
          helpresponse = response;
          if (helpresponse.length == 1) { // only one answer expected since helpid is unique identifier!!!
            this.helpmsg = helpresponse[0].helptekst;
          }
        }),
        (error => {
          this.messageService.add('HelptekstComponent - Error ' + JSON.stringify(error));
          this.error = error.statusText;
        }),
        (() => { })
      )
  }

  removeHelpMsg(): void {
    this.messageService.add('HelptekstComponent - removeHelpMsg');
    this.helpmsg = null;
  }
}
