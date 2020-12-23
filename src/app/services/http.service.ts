import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { MessageService } from './message.service';
import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends BaseService {

  baseUrl: string = "http://localhost:1337";

  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  getRestaurants(): Observable<any> {
    return this.http.get(this.baseUrl + '/restaurants')
      .pipe(
        tap(_ => this.logd('http', 'getRestaurants')),
        catchError(this.handleError<Restaurant[]>('getRestaurants', []))
      );

  }
}
