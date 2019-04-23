import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) {


    }

    getToken(): Promise<any> {
        return this.authService.getToken();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return from(this.getToken()).pipe(
            switchMap(token => {
                const headers = request.headers
                    .set('Authorization', 'Bearer ' + token)
                    .append('Content-Type', 'application/json');
                const requestClone = request.clone({
                    headers
                });
                return next.handle(requestClone);

            })
        );
    }

}
