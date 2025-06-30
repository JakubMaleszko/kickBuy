import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, of, switchMap } from 'rxjs';
import { Auth } from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = localStorage.getItem('token');

  let withToken = req;
  if (token) {
    withToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(withToken).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.url.includes('/auth/refresh')) {
        return auth.refreshToken().pipe(
          switchMap(success => {
            if (success) {
              location.reload(); 
              return of();
            } else {
              auth.logout();
              return throwError(() => err);
            }
          })
        );
      }

      return throwError(() => err);
    })
  );
};
