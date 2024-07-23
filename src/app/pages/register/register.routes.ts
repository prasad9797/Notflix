import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

export const REGISTER_ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'step1',
    component: Step1Component,
  },
  {
    path: 'step2',
    component: Step2Component,
  },
  {
    path: 'step3',
    component: Step3Component,
  },
];
