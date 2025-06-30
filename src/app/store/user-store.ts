import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { User } from "../types";
import { inject } from "@angular/core";
import { UserService } from "../services/user-service";
import { catchError, of, tap } from "rxjs";




type UserState = {
    user: User | null;
    loading: boolean;
    error: string | null;
};

const initialUserState: UserState = {
    user: null,
    loading: false,
    error: null
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialUserState),
  withMethods((store, userService = inject(UserService)) => ({
    fetchUser() {
      patchState(store, { loading: true, error: null });

      userService.getUser().pipe(
        tap((user) => {
          patchState(store, { user, loading: false });
        }),
        catchError((err) => {
          patchState(store, { error: 'Failed to load user', loading: false });
          console.error('User fetch error:', err);
          return of(null);
        })
      ).subscribe();
    }
  }))
);