import { Component } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OneThreeRowComponent } from './first-third-row/one-three-row.component';
import { SecondFourthRowComponent } from './second-fourth-row/second-fourth-row.component';
import { RegEmailComponent } from './reg-email/reg-email.component';
import { FaqComponent } from './faq/faq.component';
import { MainFooterComponent } from '../../shared/components/main-footer/main-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    LandingPageComponent,
    OneThreeRowComponent,
    SecondFourthRowComponent,
    RegEmailComponent,
    FaqComponent,
    MainFooterComponent,
  ],
})
export class HomeComponent {
  readonly tvImg = '/home/tv.png';
  readonly tvVid = '/home/video-tv-0819.m4v';
  readonly mbImg = '/home/mobile_stranger_things.jpg';
  readonly devicePileImg = '/home/device-pile.png';
  readonly deviceVid = '/home/video-devices.m4v';
  readonly kidsImg = '/home/kids.png';
  readonly args = '';
}
