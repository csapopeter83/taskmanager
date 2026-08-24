import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from './api-base-url';

const TOKEN_STORAGE_KEY = 'auth_token';

interface LoginResponse {
  accessToken: string;
}

interface JwtPayload {
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly token = signal<string | null>(this.loadValidStoredToken());

  readonly isLoggedIn = computed(() => this.token() !== null);

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<LoginResponse>(`${API_BASE_URL}/auth/login`, { username, password })
      .pipe(map((response) => this.setToken(response.accessToken)));
  }

  logout(): void {
    this.setToken(null);
  }

  getToken(): string | null {
    return this.token();
  }

  private setToken(token: string | null): void {
    this.token.set(token);
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  private loadValidStoredToken(): string | null {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (stored && !this.isExpired(stored)) {
      return stored;
    }
    if (stored) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    return null;
  }

  private isExpired(token: string): boolean {
    const payload = this.decodePayload(token);
    if (!payload?.exp) {
      return true;
    }
    return payload.exp * 1000 <= Date.now();
  }

  private decodePayload(token: string): JwtPayload | null {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    try {
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
      return JSON.parse(atob(padded));
    } catch {
      return null;
    }
  }
}
