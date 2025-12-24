import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private firestore = inject(Firestore);

  getMovies(): Observable<Movie[]> {
    // 1. Отримуємо посилання на колекцію
    const moviesCol = collection(this.firestore, 'movies');

    // 2. Використовуємо 'from', щоб перетворити Promise від Firebase в Observable (RxJS)
    // getDocs — це пряме отримання даних без зайвих обгорток
    return from(getDocs(moviesCol)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data['title'],
            year: data['year'],
            posterUrl: data['posterUrl'],
            genre: data['genre'],
            description: data['description'],
            rating: data['rating'],
          } as Movie;
        });
      })
    );
  }
}
