import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Потрібен для відображення валют, дат тощо
import { Movie } from '../../core/models/movie';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  // Наші тимчасові дані
  movies: Movie[] = [
    {
      id: '1',
      title: 'Inception',
      year: 2010,
      posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      genre: 'Sci-Fi',
      description:
        'A thief who steals corporate secrets through the use of dream-sharing technology...',
      rating: 9,
    },
    {
      id: '2',
      title: 'The Matrix',
      year: 1999,
      posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      genre: 'Action',
      description:
        'A computer hacker learns from mysterious rebels about the true nature of his reality...',
      rating: 8.7,
    },
    {
      id: '3',
      title: 'Interstellar',
      year: 2014,
      posterUrl: 'https://image.tmdb.org/t/p/w500/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
      genre: 'Sci-Fi',
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: 8.5,
    },
  ];
}
