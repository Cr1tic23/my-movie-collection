import { Routes } from '@angular/router';
import { MovieList } from './features/movie-list/movie-list';
import { MovieDetails } from './features/movie-details/movie-details';
import { MovieAdd } from './features/movie-add/movie-add';
import { Login } from './features/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MovieList,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'add',
    component: MovieAdd,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: MovieAdd,
    canActivate: [authGuard],
  },
  {
    path: 'movies/:id',
    component: MovieDetails,
  },
  { path: '**', redirectTo: '' },
];
