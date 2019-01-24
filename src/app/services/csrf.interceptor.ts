import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.generated.dev';


@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'x-csrf-token',
      token = this.tokenExtractor.getToken() as string;

    console.log('token !== null: ', token !== null);
    console.log('!req.headers.has(headerName): ', req.headers.has(headerName));

    if (token !== null && !req.headers.has(headerName) && this.isProperUrl(req)) {
      console.log('Adding csrf header');
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }

  isProperUrl(req: HttpRequest<any>): boolean {
    console.log('req.url: ', req.url);
    console.log('environment.production: ', environment.production);
    console.log('req.url.includes herokuapp: ', req.url.includes('herokuapp'));

    if (environment.production) {
      return req.url.includes('herokuapp');
    } else {
      return req.url.includes('localhost');
    }
  }
}
