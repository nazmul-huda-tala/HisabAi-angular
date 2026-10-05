import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';

/**
 * Route-level RBAC. Attach via route `data: { roles: ['owner', 'admin'] }`.
 * Runs after authGuard (which already confirms the user is logged in) —
 * this only decides whether the logged-in user's role may see this route.
 * Real enforcement still has to happen on the backend; this only hides UI.
 */
export const roleGuard: CanActivateFn = (route) => {
  const allowedRoles = route.data['roles'] as UserRole[] | undefined;
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.hasRole(...allowedRoles)) {
    return true;
  }

  // Logged in, but this role isn't allowed here — send back to a page everyone can see.
  return router.createUrlTree(['/dashboard']);
};
