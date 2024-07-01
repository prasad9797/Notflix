import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [MainHeaderComponent, RouterOutlet],
})
export class RegisterComponent {
  readonly imgSrc = '/register/Devices.png';
}
