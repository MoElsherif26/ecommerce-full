import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  
  const platformId = inject(PLATFORM_ID);
  
  // Ensure we're running in the browser before accessing localStorage
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('userToken'); // Adjust key if necessary

    if (token) {
      req = req.clone({
        setHeaders: {
          token: token
        }
      });
    }
  }
  
  return next(req);
};
