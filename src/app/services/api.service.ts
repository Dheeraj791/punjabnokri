import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
                'Authorization': 'Bearer ' + this.storage.get('accessToken'),
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

}