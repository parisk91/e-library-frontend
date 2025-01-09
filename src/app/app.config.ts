import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withFetch } from "@angular/common/http";
import { AuthInterceptorService } from './shared/services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),  provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi(), withFetch()), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
};
