import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-second-fourth-row',
  standalone: true,
  imports: [],
  templateUrl: './second-fourth-row.component.html',
  styleUrl: './second-fourth-row.component.scss',
})
export class SecondFourthRowComponent {
  @Input() titleText!: string;
  @Input() descriptionText!: string;

  @Input() imgSrc!: string;

  @Input() args: string = '';
}
