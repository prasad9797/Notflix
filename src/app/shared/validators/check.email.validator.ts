import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export function checkEmailValidator(
  authService: AuthService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.checkEmailExists(control.value).pipe(
      map((exists) => (exists ? { emailExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
