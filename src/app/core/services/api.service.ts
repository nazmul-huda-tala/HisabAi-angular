import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api.model';

function unwrap<T>(res: ApiResponse<T>): T {
  if (!res.success) {
    throw new Error(res.message || 'Request failed');
  }
  return res.data;
}

/**
 * Turns any HTTP/validation error from the backend into a short message
 * the UI can show. Handles the backend's `{ success:false, message, data:{field:msg} }` shape.
 */
export function apiErrorMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      return 'সার্ভারের সাথে সংযোগ হচ্ছে না। ব্যাকএন্ড (localhost:8080) চালু আছে কিনা দেখুন।';
    }
    const body = err.error;
    if (body && typeof body === 'object') {
      const fields = body.data && typeof body.data === 'object' ? Object.values(body.data) : [];
      if (fields.length > 0) return fields.join(', ');
      if (typeof body.message === 'string' && body.message) return body.message;
    }
    if (err.status === 401 || err.status === 403) return 'সেশন শেষ হয়েছে, আবার লগইন করুন।';
    return `অনুরোধ ব্যর্থ হয়েছে (${err.status}).`;
  }
  if (err instanceof Error && err.message) return err.message;
  return 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।';
}

/** Thin wrapper over HttpClient that prefixes the API base URL and unwraps the `{success,data}` envelope. */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  get<T>(path: string, params?: Record<string, string | number | boolean>): Observable<T> {
    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params ?? {})) {
      httpParams = httpParams.set(key, String(value));
    }
    return this.http.get<ApiResponse<T>>(`${this.base}${path}`, { params: httpParams }).pipe(map(unwrap<T>));
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<ApiResponse<T>>(`${this.base}${path}`, body).pipe(map(unwrap<T>));
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.base}${path}`, body).pipe(map(unwrap<T>));
  }

  delete<T = void>(path: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.base}${path}`).pipe(map(unwrap<T>));
  }
}
