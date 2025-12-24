import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    ReactiveFormsModule, // <--- Обов'язково для форм
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './movie-add.html',
  styleUrl: './movie-add.scss',
})
export class MovieAdd {
  private fb = inject(FormBuilder);
  private moviesService = inject(MoviesService);
  private router = inject(Router);

  // Створюємо форму
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

  onSubmit() {
    if (this.movieForm.valid) {
      const formValue = this.movieForm.value;

      const actorsArray = formValue.actors ? formValue.actors.split(',').map((a) => a.trim()) : [];

      const newMovie = {
        ...formValue,
        actors: actorsArray,
      };

      this.moviesService.addMovie(newMovie).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
