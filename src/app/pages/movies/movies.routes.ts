import { Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDetailsResolver } from '../../core/resolvers/movie-detail.resolver';
import { AuthGuard } from '../../core/guards/auth.guard';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: MovieDetailsComponent,
    resolve: {
      movieData: MovieDetailsResolver,
    },
  },
];
