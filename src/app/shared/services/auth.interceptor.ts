import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
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
      headers: req.headers.set('Authorization', 'Bearer ${authToken}')
    });
    return next.handle(authRequest)
  }
}

