import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ApiError } from './api-error';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import * as _ from 'lodash';

@Injectable()
export class ApiService {

    private defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
    };

    constructor(
        private http: HttpClient,
        private storage: Storage
    ) {

    }

    private getHeaders(authenticate = true, upload = false) {
        let additionalHeaders = {};
        let application = 'web';

        if (authenticate) {
            additionalHeaders = {
                'Authorization': 'Bearer ' + this.storage.get('accessToken').then((value) => {
                    return value;
                }),
                'X-Application': application
            };
        }

        if (upload) {
            additionalHeaders['Content-Type'] = 'multipart/form-data';
            additionalHeaders['Accept'] = 'application/json';
        }

        return new HttpHeaders(
            _.assign({}, this.defaultHeaders, additionalHeaders)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    authenticate(username: string, password: string): Observable<{}> {
        return this.http.post(
            `${environment.api.endpoint}/oauth/token`,
            {
                username: username,
                password: password,
                grant_type: 'password',
                client_id: environment.api.clientId,
                client_secret: environment.api.clientSecret,
                scope: '*'
            },
            {
                headers: new HttpHeaders(this.defaultHeaders)
            }
        );
    }

    get(endpoint: string, params?: any, authenticate = true): Observable<{}> {

        return this.http.get(
            `${environment.api.endpoint}/${endpoint}`,
            {
                headers: this.getHeaders(authenticate),
                params: params
            }
        )
            .pipe(
                catchError(this.handleError)
            );

    }

    post(endpoint: string, params: any, authenticate = true, upload = false): Observable<{}> {


        return this.http.post(
            `${environment.api.endpoint}/${endpoint}`,
            params,
            {
                headers: this.getHeaders(authenticate)
            }
        ).pipe(
            catchError(this.handleError)
        );;

    }

    put(endpoint: string, params: any, authenticate = true, upload = false): Observable<{}> {
        return this.http.put(
            `${environment.api.endpoint}/${endpoint}`,
            params,
            {
                headers: this.getHeaders(authenticate)
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

    delete(endpoint: string, params?: any): Observable<{}> {
        let qs = '';


        return this.http.delete(
            `${environment.api.endpoint}/${endpoint}${qs}`,
            {
                headers: this.getHeaders(),
                params: params
            }
        ).pipe(
            catchError(this.handleError)
        );;
    }

}