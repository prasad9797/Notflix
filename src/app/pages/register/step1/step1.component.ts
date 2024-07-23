import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MainHeaderComponent } from '../../../shared/components/main-header/main-header.component';
import { AuthService } from '../../../shared/services/auth.service';
import { RegistrationService } from '../../../shared/services/registration.service';
import { checkEmailValidator } from '../../../shared/validators/check.email.validator';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MainHeaderComponent,
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements OnInit {
  registerEmail!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.registerEmail = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [checkEmailValidator(this.authService)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.registerEmail.valid) {
      this.registrationService.setEmailPassword(this.registerEmail.value);
      this.router.navigate(['/register/step2']);
    }
  }
}
