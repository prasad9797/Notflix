import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() movieDetails!: Movie;
  @Output() scrollPosition = new EventEmitter<void>();

  private readonly moviePosterURL = 'https://image.tmdb.org/t/p/w500';
  loading: boolean = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  getPosterURL() {
    return this.moviePosterURL + this.movieDetails.poster_path;
  }

  showMoreDetails() {
    this.loading = true;
    this.scrollPosition.emit();
    this.router.navigate(['/movies', this.movieDetails.id]);
  }

  goBack() {
    this.location.back();
  }
}
