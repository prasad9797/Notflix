import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MainHeaderComponent } from '../../../shared/components/main-header/main-header.component';
import { RegistrationService } from '../../../shared/services/registration.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MainHeaderComponent,
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  usernameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registraionService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      tmdbKey: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.usernameForm.valid) {
      this.registraionService.setUsernameTmdbKey(this.usernameForm.value);
      this.router.navigate(['/register/step3']);
    }
  }
}
