import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, Cart, CartResponse } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly http = inject(HttpClient);
  readonly baseUrl = 'https://dummyjson.com/user/';

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  updateUser(id: number, payload: Partial<User>) {
  return this.http.put<User>(`https://dummyjson.com/users/${id}`, payload);
}

getCart(userId: number): Observable<Cart | null> {
  return this.http.get<CartResponse>(`https://dummyjson.com/carts/user/${userId}`).pipe(
    map(response => response.carts.length > 0 ? response.carts[0] : null)
  );
}
}
