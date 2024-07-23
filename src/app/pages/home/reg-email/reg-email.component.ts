import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reg-email',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './reg-email.component.html',
  styleUrl: './reg-email.component.scss',
})
export class RegEmailComponent {
  registerEmail!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log(localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken')?.length === 0 && !null) {
      this.router.navigate(['/movies']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
