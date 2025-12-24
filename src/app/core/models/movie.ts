export interface Movie {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  genre: string;
  description: string;
  rating: number; // від 1 до 100
  director?: string;
  actors?: string[];
}
