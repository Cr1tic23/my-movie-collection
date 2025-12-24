import { Routes } from '@angular/router';
import { MovieList } from './features/movie-list/movie-list';
import { MovieDetails } from './features/movie-details/movie-details';
import { MovieAdd } from './features/movie-add/movie-add';

export const routes: Routes = [
  {
    path: '',
    component: MovieList,
  },
  {
    path: 'add',
    component: MovieAdd,
  },
  {
    path: 'movies/:id',
    component: MovieDetails,
  },
  { path: '**', redirectTo: '' },
];
