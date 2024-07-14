import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trailer-dialog-box',
  standalone: true,
  templateUrl: './trailer-dialog-box.component.html',
  styleUrl: './trailer-dialog-box.component.scss',
  imports: [SafeUrlPipe, CarouselModule, CommonModule],
})
export class TrailerDialogBoxComponent {
  currentTrailerIndex = 0;
  tralierId: string = '';

  constructor(
    public dialogRef: MatDialogRef<TrailerDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trailers: string[] }
  ) {}

  ngAfterViewInit(): void {
    this.currentTrailerId();
  }

  currentTrailerId() {
    console.log(this.data.trailers[0]);
    this.tralierId = this.data.trailers[this.currentTrailerIndex];
  }

  nextTrailer() {
    if (this.currentTrailerIndex < this.data.trailers.length - 1) {
      this.currentTrailerIndex++;
      this.currentTrailerId();
    }
  }

  previousTrailer() {
    if (this.currentTrailerIndex > 0) {
      this.currentTrailerIndex--;
      this.currentTrailerId();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
