import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, take, tap } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { MovieDetails } from '../interfaces/movie-details.interface';
import { MovieTrailer } from '../interfaces/movie-trailer';

const options = {
  params: {
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: true,
  },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWUyNDk3MzcwZWFmN2NkOWY0YjA2NWRlZjRkOGRkYyIsIm5iZiI6MTcyMDI4ODE1Ny4yMDc2MTcsInN1YiI6IjY2ODU4MGMzNTFhN2JmYjMzYTAyNmFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktMeplpjr_i8jYa2quRPt46LUMZsRcjvQgtywYA8ZQo',
  },
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly movieAPI: string =
    'https://api.themoviedb.org/3/discover/movie';

  private readonly movieIdAPI: string = 'https://api.themoviedb.org/3/movie/';

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new Subject<string>();

  movies$ = this.moviesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  private currentPage = 1;

  constructor(private http: HttpClient) {}

  getMovies() {
    if (this.loadingSubject.value) return;

    this.loadingSubject.next(true);

    const params = {
      ...options.params,
      page: this.currentPage.toString(),
    };

    this.http
      .get<any>(this.movieAPI, { ...options, params })
      .pipe(
        map((response) => response.results as Movie[]),
        tap(
          (newMovies) => {
            const currentMovies = this.moviesSubject.value;
            this.moviesSubject.next([...currentMovies, ...newMovies]);
            this.currentPage++;
            this.loadingSubject.next(false);
          },
          (error) => {
            console.error('Error fetching movies:', error);
            this.errorSubject.next('Failed to fetch movies. Please try again.');
            this.loadingSubject.next(false);
          }
        )
      )
      .subscribe();
  }

  getMovieById(id: number) {
    return this.http
      .get<MovieDetails>(this.movieIdAPI + id, options)
      .pipe(take(1));
  }

  getMovieTrailer(id: number) {
    return this.http
      .get<MovieTrailer>(`${this.movieIdAPI}${id}/videos`, options)
      .pipe(take(1));
  }

  resetMovies() {
    this.currentPage = 1;
    this.moviesSubject.next([]);
  }
}
