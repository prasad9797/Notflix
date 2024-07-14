import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { Step1Component } from './pages/register/step1/step1.component';
import { Step3Component } from './pages/register/step3/step3.component';
import { Step2Component } from './pages/register/step2/step2.component';
import { MovieDetailsComponent } from './pages/movies/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register/step1',
    component: Step1Component,
  },
  {
    path: 'register/step2',
    component: Step2Component,
  },
  {
    path: 'register/step3',
    component: Step3Component,
  },
  {
    path: 'movies',
    component: MoviesComponent,
    data: { reuseRoute: true },
  },
  { path: 'movie/:id', component: MovieDetailsComponent },
];
