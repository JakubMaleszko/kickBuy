import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { isLoggedIn, isLoggedOut } from './auth-guard';
import { ProductDetails } from './pages/product-details/product-details';
import { NotFound } from './pages/not-found/not-found';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { Pages } from './pages/pages';

export const routes: Routes = [
     {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '', canActivateChild: [isLoggedOut], children: [
        {path: 'login', component: Login}
    ]},
    {path: '', component: Pages, children: [
        {path: 'home', component: Home},
        {path: 'product/:id', component: ProductDetails},
        {path: 'cart', component: Cart, canActivate: [isLoggedIn]},
        {path: 'profile', component: Profile, canActivate: [isLoggedIn]},
    ]},
    {path: '**', component: NotFound}
];
