import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies';
import { Firestore } from '@angular/fire/firestore';

describe('MoviesService', () => {
  let service: MoviesService;

  const firestoreSpy = { collection: () => {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesService, { provide: Firestore, useValue: firestoreSpy }],
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
