import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.routes').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.routes').then((m) => m.MOVIES_ROUTES),
    data: { preload: true, delay: 1000 },
  },
];
