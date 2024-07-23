import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  //console.log('AuthInterceptor running, token:', authToken);

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
      },
    });
    return next(authReq);
  }

  return next(req);
};
