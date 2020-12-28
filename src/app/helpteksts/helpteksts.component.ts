import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Helptekst } from '../model/helptekst.model';
import { HelptekstService } from '../services/helptekst.service';
import { MessageService } from '../services/message.service';


import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-helpteksts',
  templateUrl: './helpteksts.component.html',
  styleUrls: ['./helpteksts.component.css']
})
export class HelptekstsComponent implements OnInit {

  helpteksts$: Observable<Helptekst[]>;
  selectedHelptekst: Helptekst;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(private messageService: MessageService, private helptekstService: HelptekstService) { }

  ngOnInit(): void {
    this.messageService.add('helptekstscomponent ngoninit');
    this.helpteksts$ = this.helptekstService.getHelpteksts();
  }

  onSelect(helptekst: Helptekst): void {
    this.messageService.add('helptekstscomponent selected: ' + JSON.stringify(helptekst));
    this.selectedHelptekst = helptekst;
  }
}
