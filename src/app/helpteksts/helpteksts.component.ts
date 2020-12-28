import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Helptekst } from '../model/helptekst.model';
import { HelptekstService } from '../services/helptekst.service';

@Component({
  selector: 'app-helpteksts',
  templateUrl: './helpteksts.component.html',
  styleUrls: ['./helpteksts.component.css']
})
export class HelptekstsComponent implements OnInit {

  helpteksts$: Observable<Helptekst[]>;

  selectedHelptekst: Helptekst;

  constructor(private helptekstService: HelptekstService) { }

  ngOnInit(): void {
    console.log('helptekstscomponent ngoninit');
    this.helpteksts$ = this.helptekstService.getHelpteksts();
  }

  onSelect(helptekst: Helptekst): void {
    this.selectedHelptekst = helptekst;
  }
}
