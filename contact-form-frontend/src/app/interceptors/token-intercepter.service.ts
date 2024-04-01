import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('access_token');
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          return authenticationService.refreshToken(refreshToken).pipe(
            switchMap((data) => {
              if (data.success) {
                localStorage.setItem('access_token', data.accessToken);
                localStorage.setItem('refresh_token', data.refreshToken);
                const authReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${data.accessToken}`,
                  },
                });
                return next(authReq);
              } else {
                localStorage.clear();
                router.navigate(['/login']);
              }
              return next(authReq);
            })
          );
        } else {
          localStorage.clear();
          router.navigate(['/login']);
        }
      }

      return throwError(error);
    })
  );
};
