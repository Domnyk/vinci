import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.generated.dev';


@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-CSRF-Token',
      token = this.tokenExtractor.getToken() as string;

    if (token !== null && !req.headers.has(headerName) && this.isProperUrl(req)) {
      console.log('Adding csrf header');
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }

  isProperUrl(req: HttpRequest<any>): boolean {
    if (environment.production) {
      return req.url.includes('herokuapp');
    } else {
      return req.url.includes('localhost');
    }
  }
}
