import { signalStore, withState, withMethods, withComputed, withHooks, patchState } from "@ngrx/signals";
import { Product, ProductResponse } from "../types";
import { ProductService } from '../services/product.service';
import { inject, computed, LOCALE_ID } from "@angular/core";
import { map, pipe, switchMap, tap } from "rxjs";
import { catchError, of } from 'rxjs';

type ProductState = {
    products: Product[];
    loading: boolean;
    query: string;
    currentPage: number;
    pageSize: number;
    totalProducts: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    error: string;
};

const initialProductState: ProductState = {
    products: [],
    loading: false,
    query: '',
    currentPage: 1,
    pageSize: 30,
    totalProducts: 0,
    sortBy: '',
    sortOrder: 'asc',
    error: ''
};

export const ProductStore = signalStore(
    { providedIn: 'root' },
    withState(initialProductState),
    withComputed((store) => ({
        skip: computed(() => store.currentPage() * store.pageSize() - store.pageSize()),
        totalPages: computed(() => Math.ceil(store.totalProducts() / store.pageSize())),
    })),
    withMethods((store, productService = inject(ProductService)) => ({
        getProducts() {
            patchState(store, { loading: true });
            productService.getProducts(
                store.pageSize(),
                store.skip(),
                store.query(),
                store.sortBy(),
                store.sortOrder()
            ).pipe(
                tap((res: ProductResponse) => {
                     patchState(store, { products: res.products, totalProducts: res.total, loading: false })
                    console.log("Tiger");
                }),
                catchError((err) => {
                    patchState(store, { loading: false, error: 'Failed to load products' });
                    return of(err);
                })
            ).subscribe()
        },
        setQuery(query: string) {
            patchState(store, { query: query });
        },
        setSort(sortBy: string, sortOrder: 'asc' | 'desc') {
            patchState(store, { sortBy: sortBy, sortOrder: sortOrder })
        }
    })
    )
)
