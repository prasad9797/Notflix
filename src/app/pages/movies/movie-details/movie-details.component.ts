import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../shared/services/movie.service';
import { CommonModule, Location } from '@angular/common';
import { MovieDetails } from '../../../shared/interfaces/movie-details.interface';
import { MatDialog } from '@angular/material/dialog';
import { TrailerDialogBoxComponent } from './trailer-dialog-box/trailer-dialog-box.component';
import { MovieTrailer } from '../../../shared/interfaces/movie-trailer';

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
  trailerIds: string[] = [];

  private readonly moviePosterURL = 'https://image.tmdb.org/t/p/w200';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService
        .getMovieById(+id)
        .subscribe((movieDetails: MovieDetails) => {
          this.movieInfo = movieDetails;
        });
      this.movieService
        .getMovieTrailer(+id)
        .subscribe((movieTrailer: MovieTrailer) => {
          this.movieVideos = movieTrailer;
          this.parseMovieTrailers();
        });
    }
  }

  get_Genre() {
    return this.movieInfo.genres.map((genre) => genre.name);
  }

  getPosterURL() {
    return this.moviePosterURL + this.movieInfo.poster_path;
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
