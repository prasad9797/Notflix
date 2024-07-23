import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { MovieDetails } from '../../shared/interfaces/movie.details.interface';
import { MovieTrailer } from '../../shared/interfaces/movie.trailer.interface';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { MovieCredits } from '../../shared/interfaces/movie.credits.interface';
import { MovieImages } from '../../shared/interfaces/movie.images.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsResolver implements Resolve<any> {
  constructor(private movieService: MovieService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');

    if (!id) {
      return of({
        details: {} as MovieDetails,
        trailer: {} as MovieTrailer,
        credits: {} as MovieCredits,
        images: {} as MovieImages,
      });
    }

    return forkJoin({
      details: this.movieService.getMovieById(+id),
      trailer: this.movieService.getMovieTrailer(+id),
      credits: this.movieService.getMovieCredits(+id),
      images: this.movieService.getMovieImages(+id),
    }).pipe(
      map((result: any) => ({
        trailer: { ...result.trailer },
        details: {
          ...result.details,
          backdrop_path: result.details.backdrop_path
            ? this.movieService.getImageUrl(
                result.details.backdrop_path,
                'original'
              )
            : null,
          poster_path: result.details.poster_path
            ? this.movieService.getImageUrl(result.details.poster_path)
            : null,
        },
        credits: {
          ...result.credits,
          cast: result.credits.cast.map((actor: any) => ({
            ...actor,
            profile_path: actor.profile_path
              ? this.movieService.getImageUrl(actor.profile_path, 'w200')
              : null,
          })),
        },
        images: {
          ...result.images,
          backdrops: result.images.backdrops.map((img: any) => ({
            ...img,
            file_path: this.movieService.getImageUrl(img.file_path, 'original'),
          })),
          posters: result.images.posters.map((img: any) => ({
            ...img,
            file_path: this.movieService.getImageUrl(img.file_path, 'w500'),
          })),
        },
      })),
      catchError((error) => {
        console.log('Error fetching movie details', error);
        return of({
          details: {} as MovieDetails,
          trailer: {} as MovieTrailer,
          credits: {} as MovieCredits,
          images: {} as MovieImages,
        });
      })
    );
  }
}
