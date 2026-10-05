import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

function withToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}

/**
 * Adds `Authorization: Bearer <accessToken>` to every backend call, and — when the
 * short-lived access token has expired — silently refreshes it once and retries.
 * The backend answers an expired/missing token with 401 or 403, so both are handled.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const isBackendCall = req.url.startsWith(environment.apiUrl);
  const isAuthEndpoint = req.url.includes('/auth/');
  if (!isBackendCall || isAuthEndpoint) {
    return next(req);
  }

  const token = auth.accessToken();
  const outgoing = token ? withToken(req, token) : req;

  return next(outgoing).pipe(
    catchError((error: unknown) => {
      const status = error instanceof HttpErrorResponse ? error.status : 0;
      if ((status === 401 || status === 403) && auth.refreshToken()) {
        return auth.refresh().pipe(
          switchMap((newToken) => next(withToken(req, newToken))),
          catchError((refreshError) => {
            auth.logout(true);
            return throwError(() => refreshError);
          }),
        );
      }
      if ((status === 401 || status === 403) && !token) {
        auth.logout(true);
      }
      return throwError(() => error);
    }),
  );
};
