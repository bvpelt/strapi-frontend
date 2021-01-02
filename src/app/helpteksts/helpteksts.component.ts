import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Helptekst } from '../model/helptekst.model';
import { HelptekstService } from '../services/helptekst.service';
import { MessageService } from '../services/message.service';
import { Location } from '@angular/common';

import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-helpteksts',
  templateUrl: './helpteksts.component.html',
  styleUrls: ['./helpteksts.component.css']
})
export class HelptekstsComponent implements OnInit {
  helpteksts$: Observable<Helptekst[]>;
  selectedHelptekst: Helptekst;
  error: string;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  // paging parameters
  start: number = 0;
  limit: number = 5;
  newPos: number = 0;
  curMax: number = 0;
  showNext: boolean = false;
  showPrev: boolean = false;
  lastAction: number = 0; // 0 = next, 1 =prev

  constructor(private messageService: MessageService,
    private helptekstService: HelptekstService,
    private location: Location) { }

  ngOnInit(): void {
    this.messageService.add('HelptekstsComponent ngoninit');
    this.helpteksts$ = this.helptekstService.getHelpteksts(this.start, this.limit);
    this.helpteksts$.subscribe(
      (result => {
        if (result.length == this.limit) {
          this.showNext = true;      // there can be more elements
        } else {
          this.showNext = false;     // there are defenitly no more elements
        }
        this.newPos = result.length; // set the new position       
        this.curMax = this.newPos;   // set new maximum length
        this.lastAction = 0;
      })
    );
  }

  onSelect(helptekst: Helptekst): void {
    this.messageService.add('HelptekstsComponent selected: ' + JSON.stringify(helptekst));
    this.selectedHelptekst = helptekst;
  }

  delete(helptekst: Helptekst): void {
    this.messageService.add('helptekstscomponent delete');
    this.helptekstService.deleteHelptekst(helptekst)
      .subscribe(
        (response => {
          this.messageService.add('HelptekstsComponent deleted: ' + JSON.stringify(helptekst));
        }),
        (error => { this.error = error }),
        (() => {
          this.helpteksts$ = this.helptekstService.getHelpteksts(this.start, this.limit);
          if (this.curMax > 0) {
            this.curMax = this.curMax - 1;
          }
        })
      );
  }

  goBack(): void {
    this.location.back();
  }

  next(): void {
    this.messageService.add('HelptekstsComponent next entry newPos: ' + this.newPos + ' start: ' + this.start + ' curMax: ' + this.curMax);
    this.start = this.newPos;        // increment to newPos
    this.messageService.add('HelptekstsComponent next call  newPos: ' + this.newPos + ' start: ' + this.start + ' curMax: ' + this.curMax);
    this.helpteksts$ = this.helptekstService.getHelpteksts(this.start, this.limit);
    this.helpteksts$.subscribe(
      (result => {
        if (result.length == this.limit) {
          this.showNext = true;      // there can be more elements
        } else {
          this.showNext = false;     // there are defenitly no more elements
        }

        this.newPos = this.start + result.length; // set the current position

        if (this.curMax < this.newPos) {
          this.curMax = this.newPos;               // set new maximum length
        }

        if (this.newPos > this.limit) {
          this.showPrev = true;
        } else {
          this.showPrev = false;
        }
        this.lastAction = 0;
      })
    );
  }

  prev(): void {
    this.messageService.add('HelptekstsComponent prev entry newPos: ' + this.newPos + ' start: ' + this.start + ' curMax: ' + this.curMax);
    if (this.lastAction == 0) {
      if (this.newPos > this.limit) {
        this.start = this.newPos - this.limit;
      } else {
        this.start = 0;
      }
    } else {
      if (this.newPos > 2 * this.limit) {
        this.start = this.newPos - 2 * this.limit;
      } else {
        this.start = 0;
      }
    }
    this.messageService.add('HelptekstsComponent prev call  newPos: ' + this.newPos + ' start: ' + this.start + ' curMax: ' + this.curMax);

    this.helpteksts$ = this.helptekstService.getHelpteksts(this.start, this.limit);
    this.helpteksts$.subscribe(
      (result => {
        if (result.length == this.limit) {
          this.showNext = true;      // there can be more elements
        } else {
          this.showNext = false;     // there are defenitly no more elements
        }

        this.newPos = this.start + result.length; // set the current position

        if (this.newPos > this.limit) {
          this.showPrev = true;
        } else {
          this.showPrev = false;
        }
        this.lastAction = 1;
      })
    );

  }
}
