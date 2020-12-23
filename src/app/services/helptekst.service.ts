import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helptekst } from '../model/helptekst.model';
import { Observable } from 'rxjs';
import { find, repeatWhen, mapTo, startWith, filter } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HelptekstService {

  baseUrl: string = 'http://localhost:1337';
  helpteksts$: Observable<Helptekst[]>;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHelpteksts(): Observable<Helptekst[]> {
    this.messageService.add('helptekstService: getHelpteksts');
    return this.http.get<Helptekst[]>(this.baseUrl + '/helpteksts');
  }

  addHelpteksts(helptekst: Helptekst): any {
    this.messageService.add('helptekstService: addHelpteksts');

    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append("Authorization", "Basic " + btoa("test:strapitest"));

    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.post(this.baseUrl + '/helpteksts', helptekst);
  }

  getHelptekst(helptekst: string): Observable<Helptekst> {
    this.messageService.add('helptekstService: getHelptekst: ' + helptekst);
    return this.getHelpteksts().pipe(
      find((h: any) => h.helpid === helptekst)
    )
  }

}
