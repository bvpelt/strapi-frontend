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

  constructor(private messageService: MessageService,
    private helptekstService: HelptekstService,
    private location: Location) { }

  ngOnInit(): void {
    this.messageService.add('helptekstscomponent ngoninit');
    this.helpteksts$ = this.helptekstService.getHelpteksts();
  }

  onSelect(helptekst: Helptekst): void {
    this.messageService.add('helptekstscomponent selected: ' + JSON.stringify(helptekst));
    this.selectedHelptekst = helptekst;
  }

  delete(helptekst: Helptekst): void {
    this.messageService.add('helptekstscomponent delete');
    this.helptekstService.deleteHelptekst(helptekst)
      .subscribe(
        (response => {
          this.messageService.add('helptekstscomponent deleted: ' + JSON.stringify(helptekst));
          this.helpteksts$ = this.helptekstService.getHelpteksts();
        }),
        (error => { this.error = error }),
        (() => { this.error = 'Unknown error' })
      );
  }

  goBack(): void {
    this.location.back();
  }
}
