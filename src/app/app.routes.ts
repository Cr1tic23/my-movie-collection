import { Routes } from '@angular/router';
import { MovieList } from './features/movie-list/movie-list';
import { MovieDetails } from './features/movie-details/movie-details';

export const routes: Routes = [
  { path: '', component: MovieList },
  { path: 'movies/:id', component: MovieDetails },
  { path: '**', redirectTo: '' },
];
