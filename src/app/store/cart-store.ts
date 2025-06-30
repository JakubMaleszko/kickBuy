import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Cart } from "../types"
import { inject } from "@angular/core";
import { UserService } from "../services/user-service";
import { catchError, of, switchMap } from "rxjs";


type CartState = {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
};

const initialCartState: CartState = {
    cart: null,
    loading: false,
    error: null
}

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialCartState),
    withMethods((store, userService = inject(UserService)) => ({
        getCart() {
            patchState(store, { loading: true, error: null });

            userService.getUser().pipe(
                switchMap(user => userService.getCart(user.id)),
                catchError(err => {
                    patchState(store, { loading: false, error: 'Failed to load cart' });
                    return of(null);
                })
            ).subscribe(cart => {
                patchState(store, { cart, loading: false });
            });

        }
    }))
);