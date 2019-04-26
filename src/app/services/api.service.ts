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
        'X-Application': 'mobile'
    };

    token: string = '';

    constructor(
        private http: HttpClient,
        private storage: Storage
    ) {


    }
    /*
    * Add additional header parameters
    */

    getHeaders(authenticate: boolean = false) {
        let additionalHeaders = {};

        return new HttpHeaders(
            _.assign({}, this.defaultHeaders, additionalHeaders)
        );


    }

    private handleError(error: HttpErrorResponse | any) {
        let err = new ApiError('An unknown error occured');

        if (error instanceof HttpErrorResponse) {
        
            //Check for invalid fields
            if (error.error.invalid_fields) {
                err.message = _.values(error.error.invalid_fields).join(' ');
            } else {
                err.message = error.message || JSON.stringify(error);
            }
           
            err.status = error.status;
        } else {
            err.message = error.message || error.toString();
            err.status = error.status;
        }
       
        return throwError(err);
    }

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

    method(endpoint: string, type: string, params?: any) {

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