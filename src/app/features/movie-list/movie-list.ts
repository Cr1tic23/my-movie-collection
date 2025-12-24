import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MoviesService } from '../../core/services/movies';
import { Observable } from 'rxjs';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private moviesService = inject(MoviesService);

  movies$: Observable<Movie[]> = this.moviesService.getMovies();
}
