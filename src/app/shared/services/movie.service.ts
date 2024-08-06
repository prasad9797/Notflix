import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take, tap } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { MovieDetails } from '../interfaces/movie.details.interface';
import { MovieTrailer } from '../interfaces/movie.trailer.interface';
import { MovieCredits } from '../interfaces/movie.credits.interface';
import { MovieImages } from '../interfaces/movie.images.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly movieAPI: string = 'http://localhost:5566/api/v1/';

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

    // const params = {
    //   ...options.params,
    //   page: this.currentPage.toString(),
    // };

    const params = new HttpParams()
      .set('language', 'en-US')
      .set('sort_by', 'popularity.desc')
      .set('include_adult', 'false')
      .set('include_video', 'true')
      .set('page', this.currentPage.toString());

    this.http
      .get<any>(this.movieAPI + 'discover/movie', { params })
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
      .get<MovieDetails>(this.movieAPI + '/movie/' + id)
      .pipe(take(1));
  }

  getMovieCredits(id: number) {
    return this.http
      .get<MovieCredits>(`${this.movieAPI}/movie/${id}/credits`)
      .pipe(take(1));
  }

  getMovieImages(id: number) {
    return this.http
      .get<MovieImages>(`${this.movieAPI}/movie/${id}/images`)
      .pipe(take(1));
  }

  getImageUrl(path: string, size: string = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  getMovieTrailer(id: number) {
    return this.http
      .get<MovieTrailer>(`${this.movieAPI}/movie/${id}/videos`)
      .pipe(take(1));
  }
}
