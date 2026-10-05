import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, finalize, map, shareReplay, throwError } from 'rxjs';
import { AuthResponse, RegisterPayload } from '../models/api.model';
import { AppUser, USER_ROLES, UserRole } from '../models/user.model';
import { ApiService } from '../services/api.service';

const ACCESS_KEY = 'hishabai.accessToken';
const REFRESH_KEY = 'hishabai.refreshToken';
const USER_KEY = 'hishabai.currentUser';
/** Keys written by the old frontend-only demo login — removed so they can't leave a fake "logged in" state behind. */
const LEGACY_KEYS = ['hishabai.authenticated'];

function readStored(key: string): string | null {
  return localStorage.getItem(key) ?? sessionStorage.getItem(key);
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  private readonly accessTokenSignal = signal<string | null>(readStored(ACCESS_KEY));
  private readonly refreshTokenSignal = signal<string | null>(readStored(REFRESH_KEY));
  private readonly user = signal<AppUser | null>(this.readStoredUser());

  private refreshInFlight$: Observable<string> | null = null;

  /** Emits after logout so data stores (products, customers…) can drop the previous user's data. */
  readonly loggedOut$ = new Subject<void>();

  readonly isLoggedIn = () => !!this.accessTokenSignal();
  readonly currentUser = this.user.asReadonly();

  accessToken(): string | null {
    return this.accessTokenSignal();
  }

  refreshToken(): string | null {
    return this.refreshTokenSignal();
  }

  isAuthenticated(): boolean {
    return !!this.accessTokenSignal();
  }

  /** Real login against POST /api/auth/login. */
  login(email: string, password: string, rememberMe = false): Observable<AppUser> {
    return this.api
      .post<AuthResponse>('/auth/login', { email: email.trim(), password })
      .pipe(map((response) => this.startSession(response, rememberMe)));
  }

  /** Creates a new business + owner account (POST /api/auth/register) and signs the owner in. */
  register(payload: RegisterPayload): Observable<AppUser> {
    return this.api
      .post<AuthResponse>('/auth/register', payload)
      .pipe(map((response) => this.startSession(response, true)));
  }

  /** Exchanges the refresh token for a new access token. Parallel callers share one request. */
  refresh(): Observable<string> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }
    const refreshToken = this.refreshTokenSignal();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token'));
    }
    this.refreshInFlight$ = this.api.post<AuthResponse>('/auth/refresh', { refreshToken }).pipe(
      map((response) => {
        const remember = localStorage.getItem(REFRESH_KEY) !== null;
        this.persistTokens(response, remember);
        return response.accessToken;
      }),
      finalize(() => {
        this.refreshInFlight$ = null;
      }),
      shareReplay(1),
    );
    return this.refreshInFlight$;
  }

  /** Clears the session. Pass `true` when the session expired to also send the user to the login page. */
  logout(sessionExpired = false): void {
    const refreshToken = this.refreshTokenSignal();
    if (refreshToken) {
      // Best effort: tell the server to revoke the refresh token; ignore failures.
      this.api.post('/auth/logout', { refreshToken }).subscribe({ error: () => undefined });
    }

    this.accessTokenSignal.set(null);
    this.refreshTokenSignal.set(null);
    this.user.set(null);
    for (const key of [ACCESS_KEY, REFRESH_KEY, USER_KEY, ...LEGACY_KEYS]) {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }
    this.loggedOut$.next();

    if (sessionExpired) {
      void this.router.navigate(['/auth/login']);
    }
  }

  hasRole(...roles: UserRole[]): boolean {
    const current = this.user();
    return !!current && roles.includes(current.role);
  }

  private startSession(response: AuthResponse, rememberMe: boolean): AppUser {
    const appUser: AppUser = {
      name: response.name,
      email: response.email,
      role: this.mapRole(response.roles),
      userId: response.userId,
      businessId: response.businessId,
    };

    this.persistTokens(response, rememberMe);
    const store = rememberMe ? localStorage : sessionStorage;
    const other = rememberMe ? sessionStorage : localStorage;
    store.setItem(USER_KEY, JSON.stringify(appUser));
    other.removeItem(USER_KEY);
    for (const key of LEGACY_KEYS) {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }

    this.user.set(appUser);
    return appUser;
  }

  private persistTokens(response: AuthResponse, rememberMe: boolean): void {
    const store = rememberMe ? localStorage : sessionStorage;
    const other = rememberMe ? sessionStorage : localStorage;
    store.setItem(ACCESS_KEY, response.accessToken);
    store.setItem(REFRESH_KEY, response.refreshToken);
    other.removeItem(ACCESS_KEY);
    other.removeItem(REFRESH_KEY);
    this.accessTokenSignal.set(response.accessToken);
    this.refreshTokenSignal.set(response.refreshToken);
  }

  /** Backend sends role names like "Owner"; the UI uses lowercase keys. Unknown roles get the least-privileged one. */
  private mapRole(roles: string[] | undefined): UserRole {
    const first = (roles?.[0] ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');
    return (USER_ROLES as string[]).includes(first) ? (first as UserRole) : 'cashier';
  }

  private readStoredUser(): AppUser | null {
    const raw = readStored(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AppUser;
    } catch {
      return null;
    }
  }
}
