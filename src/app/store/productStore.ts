import { signalStore, withState, withMethods, withComputed, withHooks, patchState } from "@ngrx/signals";
import { Product, ProductResponse } from "../types";
import { ProductService } from '../services/product.service';
import { inject, computed, LOCALE_ID } from "@angular/core";
import { map, pipe, switchMap, tap } from "rxjs";
import { catchError, of } from 'rxjs';

type ProductState = {
    products: Product[];
    product: Product | null;
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
    product: null,
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
        // totalPages: computed(() => Math.ceil(store.totalProducts() / store.pageSize())),
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
                }),
                catchError((err) => {
                    patchState(store, { loading: false, error: 'Failed to load products' });
                    return of(err);
                })
            ).subscribe()
        },
        getProductById(id: number) {
            patchState(store, { loading: true, product: null, error: '' });

            productService.getProductById(id).pipe(
                tap((product) => {
                    patchState(store, { product, loading: false });
                }),
                catchError((err) => {
                    patchState(store, { loading: false, error: 'Failed to load product' });
                    return of(err);
                })
            ).subscribe();
        },
        // {{ Set stuff }}
        setQuery(query: string) {
            patchState(store, { query: query });
        },
        setSort(sortBy: string, sortOrder: 'asc' | 'desc') {
            patchState(store, { sortBy: sortBy, sortOrder: sortOrder })
        },
        setPageSize(size: number) {
            patchState(store, { pageSize: size });
        },
        setCurrentPage(page: number) {
            patchState(store, { currentPage: page });
        }

    })
    )
)
