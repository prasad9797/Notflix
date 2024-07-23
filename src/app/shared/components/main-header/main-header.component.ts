import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  imgSrc = '/home/netflix_icon.png';

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn = this.authService.isLoggedIn();

  signOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
