import { Component, inject, OnInit } from '@angular/core'; // Додали OnInit
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; // Додали ActivatedRoute
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MoviesService } from '../../core/services/movies';

@Component({
  selector: 'app-movie-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './movie-add.html',
  styleUrl: './movie-add.scss',
})
export class MovieAdd implements OnInit {
  private fb = inject(FormBuilder);
  private moviesService = inject(MoviesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Для читання ID з URL

  movieId: string | null = null; // Тут буде ID, якщо ми редагуємо
  isEditMode = false;

  movieForm = this.fb.group({
    title: ['', [Validators.required]],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
    director: [''],
    actors: [''],
    posterUrl: ['', [Validators.required]],
    genre: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    rating: [0, [Validators.min(0), Validators.max(10)]],
  });

  ngOnInit() {
    // Перевіряємо, чи є ID в адресі (наприклад /edit/123)
    this.movieId = this.route.snapshot.paramMap.get('id');

    if (this.movieId) {
      this.isEditMode = true;
      // Завантажуємо дані фільму
      this.moviesService.getMovieById(this.movieId).subscribe((movie) => {
        if (movie) {
          // Конвертуємо масив акторів назад у рядок для форми
          const actorsString = movie.actors ? movie.actors.join(', ') : '';

          // Заповнюємо форму даними з бази
          this.movieForm.patchValue({
            ...movie,
            actors: actorsString,
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.movieForm.valid) {
      const formValue = this.movieForm.value;
      const actorsArray = formValue.actors ? formValue.actors.split(',').map((a) => a?.trim()) : [];

      const movieData = {
        ...formValue,
        actors: actorsArray,
      };

      if (this.isEditMode && this.movieId) {
        // РЕЖИМ РЕДАГУВАННЯ: Оновлюємо
        this.moviesService.updateMovie(this.movieId, movieData as any).then(() => {
          this.router.navigate(['/movies', this.movieId]); // Повертаємось на деталі
        });
      } else {
        // РЕЖИМ ДОДАВАННЯ: Створюємо
        this.moviesService.addMovie(movieData).then(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
