import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const excludedUrls = ['/api/auth/signUp', '/api/auth/authenticate'];

    // Check if the current request URL matches an excluded URL
    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    if (isExcluded) {
      // Do not modify the request
      return next.handle(req);
    }
    /* if (req.url.includes('api/auth/signup')) {
      return next.handle(req);
    } */

    const authToken = localStorage.getItem('access_token')
    console.log('Retrieved Token:', authToken);
    if (!authToken) {
      console.warn('No auth token found, sending request without Authorization header.');
      return next.handle(req)
    }

    if (authToken.split('.').length !== 3) {
      console.error('Invalid JWT format:', authToken);
      return next.handle(req);
    }

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest)
  }
} 

