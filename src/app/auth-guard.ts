import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth-service';
import { catchError, map, of } from 'rxjs';

export const isLoggedIn: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isLoggedIn().pipe(
    map(isAuth => {
      if (!isAuth) {
        router.navigate(['/login']); // or your login route
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

export const isLoggedOut: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return auth.isLoggedIn().pipe(
    map(isAuth => {
      if (isAuth) {
        // If already logged in, redirect away from login/register
        router.navigate(['/home']); // or your main route
        return false;
      }
      return true;
    }),
    catchError(() => of(true)) // If check fails, allow route (assume logged out)
  );
};