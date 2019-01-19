import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-CSRF-Token',
      token = this.tokenExtractor.getToken() as string;

    console.log(token);
    console.log('token !== null: ', token !== null);
    console.log('!req.headers.has(headerName): ', !req.headers.has(headerName));

    if (token !== null && !req.headers.has(headerName)) {
      console.log('Adding csrf header');
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }
}
