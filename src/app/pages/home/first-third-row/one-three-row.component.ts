import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-three-row',
  standalone: true,
  imports: [],
  templateUrl: './one-three-row.component.html',
  styleUrl: './one-three-row.component.scss',
})
export class OneThreeRowComponent {
  @Input() titleText!: string;
  @Input() descriptionText!: string;

  @Input() imgSrc!: string;
  @Input() vidSrc!: string;

  @Input() args: string = '';
}
