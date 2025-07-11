import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  readonly http = inject(HttpClient);
  readonly baseUrl = 'https://dummyjson.com/auth'
  login(username: string, passwd: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/login`, { username: username, password: passwd }).pipe(
      map((res: any) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refToken', res.refreshToken);
        return true;
      }),
      catchError(() => of(false))
    );
  }
  refreshToken(): Observable<boolean> {
    const token = localStorage.getItem('refToken');
    return this.http.post(`${this.baseUrl}/refresh`, { refreshToken: token }).pipe(
      map((res: any) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refToken', res.refreshToken);
        return true;
      }),
      catchError(() => of(false))
    )
  }
  isLoggedIn(): Observable<boolean> {
    if (localStorage.getItem('token')) {
      return this.http.get(`${this.baseUrl}/me`).pipe(
        map(() => {
          return true
        }),
        catchError(() => of(false))
      )
    }
    return of(false)
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refToken');
  }
}
