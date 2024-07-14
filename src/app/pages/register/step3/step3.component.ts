import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  plans: string[] = ['Basic', 'Standard', 'Premium'];

  selectedPlan: string = 'Basic';

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
  }

  isPlanSelected(plan: string) {
    return this.selectedPlan === plan;
  }
}
