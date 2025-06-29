import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { isLoggedIn, isLoggedOut } from './auth-guard';

export const routes: Routes = [
    {path: 'login', component: Login, canActivate: [isLoggedOut]},
    {path: 'home', component: Home, canActivate: [isLoggedIn]}
];
