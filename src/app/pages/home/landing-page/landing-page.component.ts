import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../../shared/components/main-header/main-header.component';
import { RegEmailComponent } from '../reg-email/reg-email.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports: [MainHeaderComponent, RegEmailComponent],
})
export class LandingPageComponent {}
