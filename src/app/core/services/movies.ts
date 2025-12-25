import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private firestore = inject(Firestore);

  getMovies(): Observable<Movie[]> {
    const moviesCol = collection(this.firestore, 'movies');

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
            director: data['director'],
            actors: data['actors'],
          } as Movie;
        });
      })
    );
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    const docRef = doc(this.firestore, 'movies', id);
    return from(getDoc(docRef)).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) return undefined;
        const data = snapshot.data() as any;
        return {
          id: snapshot.id,
          title: data['title'],
          year: data['year'],
          posterUrl: data['posterUrl'],
          genre: data['genre'],
          description: data['description'],
          rating: data['rating'],
          director: data['director'],
          actors: data['actors'],
        } as Movie;
      })
    );
  }

  addMovie(movie: any) {
    const colRef = collection(this.firestore, 'movies');
    return addDoc(colRef, movie);
  }

  updateMovie(id: string, data: Partial<Movie>) {
    const docRef = doc(this.firestore, `movies/${id}`);
    return updateDoc(docRef, data);
  }
}
