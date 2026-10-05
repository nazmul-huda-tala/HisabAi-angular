import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomerPortalService } from '../../features/customer-portal/services/customer-portal.service';

/** Protects /portal/orders, /portal/orders/:id and /portal/profile — separate from the staff authGuard. */
export const customerPortalGuard: CanActivateFn = (_route, state) => {
  const portal = inject(CustomerPortalService);
  const router = inject(Router);

  if (portal.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/portal/login'], {
    queryParams: { returnUrl: state.url },
  });
};

/** Keeps a logged-in customer off the portal login page. */
export const customerPortalGuestGuard: CanActivateFn = () => {
  const portal = inject(CustomerPortalService);
  const router = inject(Router);

  return portal.isLoggedIn()
    ? router.createUrlTree(['/portal/orders'])
    : true;
};
