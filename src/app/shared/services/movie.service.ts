import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take, tap } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { MovieDetails } from '../interfaces/movie.details.interface';
import { MovieTrailer } from '../interfaces/movie.trailer.interface';
import { MovieCredits } from '../interfaces/movie.credits.interface';
import { MovieImages } from '../interfaces/movie.images.interface';

// const options = {
//   params: {
//     language: 'en-US',
//     sort_by: 'popularity.desc',
//     include_adult: false,
//     include_video: true,
//   },
// headers: {
//   accept: 'application/json',
//   Authorization:
//     'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5YWVkN2Q1MDk2MWVhZDBhNzAwNiIsInVzZXJuYW1lIjoidGVzdDEiLCJlbWFpbCI6InRlc3R1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTcyMTIzMjkyMiwiZXhwIjoxNzIxMzE5MzIyfQ.D3NM-gqRHqr2PQ-50LhCAFT-J6ZZ6tpMq_gPYHFQ9H2-9oKSmbH2oB--yHV7_V1dNTt1nkB4UNt0BIGDOsLRu4Gzmuam9WXd_66_cB8ovdn-lgAWfYILRR4fYATHJnX1kUGQl-Z0oPOaGiHr_bjmhUw3T9e37wiD3rCzayaPyIr6g7lLaPypqpb3weu2we9f4s9T7odLnxngFWLS5ezLlhB7DsHKdzpVd46nQC3cKqSUu3C8MEJc1ZBr3vu3ogeKVgRVB71unmIbjJLEeS_SaNjPa1cYTPgK-4MpMk9nM_mbemAXddyOD8yN8BIOaW_114OC-2BYc45WnU4sFilFuB1CbEUMr3cPRkmwbh7tFVXum99KLsks22Bj5CMMlwgTXR4rggnmQduazAtWvw0n9ii9IYQ4iNXM68txe9Mmpv1pj0Tz9QknA4mDW0yg6vHTwODS3DN3w3THJigtA_pa2qIkulJo4OHLGQHPjPJMuTT1wgeB5anh9V-9GbdbtNeFK4WiXGdRdmPcUcMwrp54BgfkzCmKgnvdeeNOTa4q0avGoXi4mmFDfEUJmAKTsMtU_4WnCdMonQSkYE5V3aPpdCpv1twdjau3bPar-YKtLrLeG6k8p1F7e0Jgoxd3GFvUXxSNREVCaoUW8WQvT_P6W8ydwHRP7VB2ldq6uniAyd8',
// },
//};

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
