import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { CommonModule, Location } from '@angular/common';
import { ReduceStringPipe } from '../../../shared/pipes/reduce-string.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
  imports: [CommonModule, ReduceStringPipe],
})
export class MovieItemComponent implements OnInit {
  private readonly moviePosterURL = 'https://image.tmdb.org/t/p/w500';

  @Input() movieDetails!: Movie;
  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    console.log('Show more details for:', this.movieDetails.title);
  }

  getPosterURL() {
    return this.moviePosterURL + this.movieDetails.poster_path;
  }

  showMoreDetails() {
    this.router.navigate(['/movie', this.movieDetails.id]);
  }

  goBack() {
    this.location.back();
  }
}
