import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // const errorMessage = err.error?.message || 'An unknown error occurred';

      // toastr.error(errorMessage, 'Error'); 
      toastr.error(err.error.message); 

      // return throwError(() => new Error(errorMessage));
      return throwError(() => err);
    })
  );
};
