import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { Movie } from '../../shared/interfaces/movie.interface';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  imports: [
    CommonModule,
    MovieItemComponent,
    MainHeaderComponent,
    ScrollingModule,
  ],
})
export class MoviesComponent implements OnInit {
  @ViewChild('virtualViewPort') infScrollContainer!: any;

  movieService = inject(MovieService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  movieList: Movie[] = [];
  loading = false;
  error: string | null = null;
  isInitailized: boolean = false;

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    if (!this.isInitailized) {
      this.initialize();
    }

    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          if (this.isInitailized) {
            this.cdr.detectChanges();
          }
        })
    );
  }

  private initialize(): void {
    this.subscriptions.add(
      this.movieService.movies$.subscribe((movies) => {
        this.movieList = movies;
        this.cdr.detectChanges();
      })
    );
    this.subscriptions.add(
      this.movieService.loading$.subscribe((loading) => {
        this.loading = loading;
        this.cdr.detectChanges();
      })
    );
    this.subscriptions.add(
      this.movieService.error$.subscribe((error) => {
        this.error = error;
        this.cdr.detectChanges();
      })
    );

    if (this.movieList.length === 0) {
      this.movieService.getMovies();
    }

    this.isInitailized = true;
  }

  ngAfterViewInit() {
    this.infScrollContainer.scrolledIndexChange.subscribe(() => {
      this.loadMoreMovies();
    });
  }

  loadMoreMovies() {
    const end = this.infScrollContainer.getRenderedRange().end;
    const total = this.infScrollContainer.getDataLength();

    if (end === total && !this.loading) {
      this.movieService.getMovies();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
