import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notAuthdGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUser()) {
    router.navigate(['/'], { replaceUrl: true });
    return false;
  }

  return true;
};
