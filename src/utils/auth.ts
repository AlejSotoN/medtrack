const TOKEN_KEY = "medtrack_token";
const EXP_KEY = "medtrack_token_expires_at";

function parseExpiryToMs(expiresIn: string): number {
    const value = parseInt(expiresIn.slice(0, -1), 10);
    const unit = expiresIn.slice(-1);
  
    switch (unit) {
      case "h": return value * 60 * 60 * 1000;
      case "m": return value * 60 * 1000;
      case "s": return value * 1000;
      default: return value * 1000;
    }
  }
  
  export function saveAuth(token: string, expiresIn: string) {
    const expiresMs = parseExpiryToMs(expiresIn)
    const expiresAt = Date.now() + expiresMs;
  
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXP_KEY, expiresAt.toString());
  }
  
  
  export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  
  export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  
  export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
  
  export function isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem(EXP_KEY);
    if (!expiresAt) return true;
  
    return Date.now() > Number(expiresAt);
  }
  