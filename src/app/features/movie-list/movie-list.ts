import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MoviesService } from '../../core/services/movies';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private moviesService = inject(MoviesService);

  searchControl = new FormControl('');

  filteredMovies$: Observable<Movie[]> = combineLatest([
    this.moviesService.getMovies(),
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([movies, searchTerm]) => {
      const term = (searchTerm || '').toLowerCase();
      return movies.filter((movie) => movie.title.toLowerCase().includes(term));
    })
  );
}
