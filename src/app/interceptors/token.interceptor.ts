import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_STORAGE } from '../models/ResponsesServer';

// interceptor utilizzato per inviare il token JWT ad ogni chiamata al server
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: TOKEN_STORAGE = JSON.parse(localStorage.getItem('token'));

    if (token && token.token) {
      const cloneReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token.token),
      });
      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}
