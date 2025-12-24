import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyABlG5uCjs8qDV6UxKcD19nJvz-NqOhVlM',
  authDomain: 'my-movie-collection-6d45e.firebaseapp.com',
  projectId: 'my-movie-collection-6d45e',
  storageBucket: 'my-movie-collection-6d45e.firebasestorage.app',
  messagingSenderId: '180013138020',
  appId: '1:180013138020:web:8997bca8bebb8e138c1f71',
  measurementId: 'G-PD7EXN5T0Z',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
