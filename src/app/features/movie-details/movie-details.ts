import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
// Короткий шлях до сервісу (як у movie-list)
import { MoviesService } from '../../core/services/movies';
import { Observable, switchMap } from 'rxjs';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  // Короткі назви файлів шаблону та стилів:
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails {
  // Або MovieDetailsComponent (перевірте, як згенерував CLI)
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);

  movie$: Observable<Movie | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');
      if (!id) return new Observable<undefined>((sub) => sub.next(undefined));
      return this.moviesService.getMovieById(id);
    })
  );
}
