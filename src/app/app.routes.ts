import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { isLoggedIn, isLoggedOut } from './auth-guard';
import { ProductDetails } from './pages/product-details/product-details';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'login', component: Login, canActivate: [isLoggedOut]},
    {path: 'home', component: Home, canActivate: [isLoggedIn]},
    {path: 'product/:id', component: ProductDetails, canActivate: [isLoggedIn]},
    {path: '**', component: NotFound}
];
