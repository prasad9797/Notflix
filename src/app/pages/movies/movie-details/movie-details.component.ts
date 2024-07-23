import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MovieDetails } from '../../../shared/interfaces/movie.details.interface';
import { MatDialog } from '@angular/material/dialog';
import { TrailerDialogBoxComponent } from './trailer-dialog-box/trailer-dialog-box.component';
import { MovieTrailer } from '../../../shared/interfaces/movie.trailer.interface';
import { MovieCredits } from '../../../shared/interfaces/movie.credits.interface';
import { MovieImages } from '../../../shared/interfaces/movie.images.interface';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  movieInfo!: MovieDetails;
  movieVideos!: MovieTrailer;
  movieCredits!: MovieCredits;
  movieImages!: MovieImages;
  trailerIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.movieInfo = data['movieData'].details;
      this.movieVideos = data['movieData'].trailer;
      this.movieCredits = data['movieData'].credits;
      this.movieImages = data['movieData'].images;
      this.parseMovieTrailers();
    });
  }

  get_Genre() {
    return this.movieInfo.genres.map((genre) => genre.name);
  }

  get backdrop() {
    return this.movieImages?.backdrops || [];
  }

  get posters() {
    return this.movieImages?.posters || [];
  }

  get actors() {
    return this.movieCredits?.cast.slice(0, 5) || [];
  }

  parseMovieTrailers() {
    this.trailerIds = this.movieVideos.results.map((res) => res.key);
  }

  openTrailerDialog(): void {
    this.dialog.open(TrailerDialogBoxComponent, {
      data: { trailers: this.trailerIds },
    });
  }

  navigateBack() {
    this.location.back();
  }
}
