import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainHeaderComponent } from '../../../shared/components/main-header/main-header.component';
import { RegistrationService } from '../../../shared/services/registration.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, RouterModule, MainHeaderComponent],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  plans: string[] = ['Basic', 'Standard', 'Premium'];

  selectedPlan: string = 'Basic';

  constructor(
    private registraionService: RegistrationService,
    private authService: AuthService,
    private router: Router
  ) {}

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
  }

  isPlanSelected(plan: string) {
    return this.selectedPlan === plan;
  }

  register() {
    const newUser = this.registraionService.getNewUser();
    console.log(newUser);
    this.authService
      .signup(newUser.email, newUser.password, newUser.username, newUser.role)
      .subscribe((response) => {
        this.registraionService.clearData();
        this.router.navigate(['/movies']);
      });
  }
}
