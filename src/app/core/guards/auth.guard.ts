import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // 🎯 VALIDACIÓN DE ROLES
  const expectedRoles = route.data?.['roles'];
  const userRole = auth.getRole();

  if (expectedRoles && !expectedRoles.includes(userRole)) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};