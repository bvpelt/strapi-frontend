import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helptekst } from '../model/helptekst.model';
import { Observable } from 'rxjs';
import { find, repeatWhen, mapTo, startWith, filter } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HelptekstService {

  jwtToken: string = null;
  baseUrl: string = 'http://localhost:1337';

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.login();
  }

  // Public available services
  getHelpteksts(start: number, limit: number): Observable<Helptekst[]> {
    let params = new HttpParams()
      .set('_sort', 'helpid:ASC')
      .set('_start', start.toString())
      .set('_limit', limit.toString());
    this.messageService.add('helptekstService: getHelpteksts');

    return this.http.get<Helptekst[]>(this.baseUrl + '/helpteksts', { params: params });
  }

  getHelptekstById(id: number): Observable<Helptekst> {
    this.messageService.add('HelptekstService: getHelptekstById: ' + id);
    return this.http.get<Helptekst>(this.baseUrl + '/helpteksts/' + id);
  }

  getHelptekstByHelpId(helpid: string): Observable<Helptekst[]> {
    this.messageService.add('HelptekstService: getHelptekstById: ' + helpid);
    let params = new HttpParams().set('helpid', helpid);
    return this.http.get<Helptekst[]>(this.baseUrl + '/helpteksts/', { params: params });
  }

  // Authorized services
  addHelptekst(helptekst: Helptekst): Observable<Helptekst> {
    this.messageService.add('helptekstService: addHelpteksts');

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.jwtToken);

    const httpOptions = {
      'headers': httpHeaders
    };
    this.messageService.add('HelptekstService - addHelptekst httpOptions: ' + JSON.stringify(httpOptions));
    return this.http.post<Helptekst>(this.baseUrl + '/helpteksts', helptekst, httpOptions);
  }

  updateHelptekst(helptekst: Helptekst): Observable<Helptekst> {
    this.messageService.add('helptekstService: updateHelptekst');

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.jwtToken);

    const httpOptions = {
      'headers': httpHeaders
    };
    this.messageService.add('HelptekstService - updateHelptekst httpOptions: ' + JSON.stringify(httpOptions));
    return this.http.put<Helptekst>(this.baseUrl + '/helpteksts/' + helptekst.id, helptekst, httpOptions);
  }

  deleteHelptekst(helptekst: Helptekst): Observable<Helptekst> {
    this.messageService.add('helptekstService: deleteHelptekst');

    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.jwtToken);

    const httpOptions = {
      'headers': httpHeaders
    };
    this.messageService.add('HelptekstService - deleteHelptekst httpOptions: ' + JSON.stringify(httpOptions));
    return this.http.delete<Helptekst>(this.baseUrl + '/helpteksts/' + helptekst.id, httpOptions);
  }

  // Provide authentication token
  login() {
    const user = {
      'identifier': 'testauthor',
      'password': 'testauthor'
    };
    console.log('HelptekstService - login start');

    this.http.post<any>(this.baseUrl + '/auth/local', user)
      .subscribe(
        (response => {
          this.messageService.add('HelptekstService - login reponse: ' + JSON.stringify(response));
          this.jwtToken = response.jwt
        }),
        (error => { this.messageService.add('HelptekstService - login reponse: ' + JSON.stringify(error)); }),
        () => { this.messageService.add('HelptekstService - login unknown error'); })
      ;
  }

}
