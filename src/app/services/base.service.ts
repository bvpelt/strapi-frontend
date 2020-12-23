 
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected baseUrl = 'http://localhost:1337';

    constructor(private messageService: MessageService) {
    }

    /** Log a message with the MessageService */
    public log(message: string) {
        this.messageService.add(`${message}`);
    }

    public logd(destination: string, message: string) {
        this.messageService.add(`${destination}: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}