declare global {
  interface Window {
    __env?: { apiBaseUrl?: string };
  }
}

export const API_BASE_URL = window.__env?.apiBaseUrl ?? 'http://localhost:3000';
