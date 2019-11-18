import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'app/api.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
              this.authenticationService.logout();
            }
            const error = err.error.message || err.statusText;
            return error;
        }));
    }
}
