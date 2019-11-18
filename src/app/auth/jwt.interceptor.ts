import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes('oauth/token')) {

        } else {
            let currentUser: any = JSON.parse(localStorage.getItem('user'));
            if (currentUser && currentUser.access_token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${currentUser.token_type} ${currentUser.access_token}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}
