import Cookies from "js-cookie";

const REFRESH_TOKEN_KEY = "sp_refresh_token";

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string): void {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    secure: window.location.protocol === "https:",
    sameSite: "strict",
    path: "/",
  });
}

export function clearRefreshToken(): void {
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
}
