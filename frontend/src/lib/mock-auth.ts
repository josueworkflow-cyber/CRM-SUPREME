const SESSION_KEY = "arena-supreme-mock-session";
const REMEMBERED_EMAIL_KEY = "arena-supreme-remembered-email";

export function hasMockSession() {
  return Boolean(
    window.localStorage.getItem(SESSION_KEY) ||
    window.sessionStorage.getItem(SESSION_KEY),
  );
}

export function startMockSession(email: string, remember: boolean) {
  const session = "active";
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);

  if (remember) {
    window.localStorage.setItem(SESSION_KEY, session);
    window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
  } else {
    window.sessionStorage.setItem(SESSION_KEY, session);
    window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
  }
}

export function getRememberedEmail() {
  return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "";
}

export function clearMockSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}
