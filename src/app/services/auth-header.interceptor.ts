import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private cookies: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cookies.check('accessToken')) {
      return next.handle(request.clone({
        setHeaders: {
          'authorization': `Bearer ${this.cookies.get('accessToken')}`
        }
      }));
    } else {
      return next.handle(request);
    }

  }
}
